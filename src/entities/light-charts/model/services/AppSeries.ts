import {
	// eslint-disable-next-line import/named
	DeepPartial, IChartApi, ISeriesApi, PriceLineOptions,
	// eslint-disable-next-line import/named
	SeriesOptionsMap, SeriesPartialOptionsMap, SeriesType
} from 'lightweight-charts';
import { ISeriesTypeMap } from '../types/ISeriesTypeMap';
import SeriesFactory from './SeriesFactory';

export type crosshairMoveSubscriberType<T extends SeriesType> = (dataPoint: ISeriesTypeMap[T]['data'] | null) => void;

export type SeriesDataItem<T extends keyof ISeriesTypeMap> = ISeriesTypeMap[T]['data'];

/**
 * Обёртка над серией lightweight-charts.
 *
 * Позволяет управлять серией (данные, опции, линии, подписки)
 * и хранит её внутреннее состояние (api, chart, конфигурация).
 *
 * ⚠️ Важно: перед использованием большинства методов необходимо вызвать
 * {@link connectToChart}, чтобы подключить серию к графику.
 *
 * @typeParam T - тип серии (Line, Area, Bar, Histogram, Candlestick и т.д.)
 */
class AppSeries<T extends SeriesType> {
	public readonly type: T;
	private readonly crosshairMoveSubscribers: {
        action: crosshairMoveSubscriberType<T>;
        id: string;
    }[];
    
	private api: ISeriesApi<T> | null;

	private dataSeries: {
        data: ISeriesTypeMap[T]['data'][];
        options: DeepPartial<SeriesPartialOptionsMap[T]>;
    };

	/**
     * Создаёт экземпляр серии.
     *
     * @param type - тип серии (например, 'Line', 'Bar', 'Area')
     * @param data - массив данных для инициализации серии
     * @param config - частичная конфигурация серии
     */
	constructor(
		type: T,
		data: ISeriesTypeMap[T]['data'][],
		config: DeepPartial<SeriesPartialOptionsMap[T]>
	) {
		this.type = type;
		this.dataSeries = { data, options: config };
		this.api = null;
		this.crosshairMoveSubscribers = [];
	}

	/**
     * Подключает серию к графику и создаёт API через фабрику.
     * ⚠️ Этот метод обязателен перед вызовом других методов серии.
     *
     * @param chart - экземпляр графика (IChartApi)
     */
	public connectToChart = (chart: IChartApi) => {
		const factoryFn = SeriesFactory[this.type] as (
            chart: IChartApi,
            options: SeriesOptionsMap[T]
        ) => ISeriesApi<T>;

		this.api = factoryFn(chart, this.dataSeries.options as SeriesOptionsMap[T]);
		this.api.setData(this.dataSeries.data);
	};

	/** Возвращает текущие данные серии */
	public getData = () => {
		return this.dataSeries.data;
	};

	/** Возвращает текущую конфигурацию серии */
	public getConfig = () => {
		return this.dataSeries.options;
	};

	/**
     * Полностью заменяет данные серии.
     * @param data - новый массив данных
     */
	public setData = (data: ISeriesTypeMap[T]['data'][]) => {
		if (this.api === null) {
			throw new Error('api returned no api returned.');
		}

		this.api.setData(data);
		this.dataSeries.data = data;
	};

	/**
     * Применяет новые опции к серии.
     * @param options - частичная конфигурация серии
     */
	public setConfig = (options: SeriesPartialOptionsMap[T]) => {
		if (this.api === null) {
			throw new Error('api returned no api returned.');
		}

		this.api.applyOptions(options);
		this.dataSeries.options = options;
	};

	/**
     * Получает значение по времени, если оно существует в данных.
     * @param time - строковое время (timestamp)
     * @returns объект данных или null
     */
	public getValueByTime = (time: string) => {
		if (this.api === null) {
			throw new Error('api returned no api returned.');
		}

		const resultValue = this.dataSeries.data.find(data => data.time === time);

		return resultValue ?? null;
	};

	/**
     * Добавляет подписку на событие движения crosshair.
     * @param subscriber - callback, который будет вызываться при изменении позиции
     * @param id
     */
	public addSubscribeCrosshairMove = (subscriber: crosshairMoveSubscriberType<T>, id: string)=> {
		this.crosshairMoveSubscribers.push({
			action: subscriber,
			id,
		});
	};

	public removeSubscribeCrosshairMove = (id: string) => {
		const sub = this.crosshairMoveSubscribers.findIndex(subscriber => subscriber.id === id);

		if (sub !== -1) {
			this.crosshairMoveSubscribers.splice(sub, 1);
		}
	};

	/** Возвращает список всех подписчиков движения crosshair */
	public getCrosshairMoveSubscribes = () => this.crosshairMoveSubscribers;

	/**
     * Добавляет или обновляет ценовую линию на серии.
     * @param priceLineOptions - параметры линии
     */
	public addPriceLine = (priceLineOptions: PriceLineOptions) => {
		if (this.api === null) {
			throw new Error('api returned no api returned.');
		}

		const priceLineFind = this.api.priceLines()
			.find(currentLine => currentLine.options().id === priceLineOptions.id);

		if (priceLineFind) {
			priceLineFind.applyOptions(priceLineOptions);
			return;
		}

		this.api.createPriceLine(priceLineOptions);
	};

	/**
     * Удаляет ценовую линию по id.
     * @param id - идентификатор линии
     */
	public removePriceLine = (id: string) => {
		if (this.api === null) {
			throw new Error('api returned no api returned.');
		}

		const priceLineFind = this.api.priceLines().find(currentLine => currentLine.options().id === id);

		if (priceLineFind) {
			this.api.removePriceLine(priceLineFind);
		}
	};

	/**
     * Возвращает API текущей серии (ISeriesApi) или null, если не подключена.
     */
	public getApi = () => this.api;
}

export default AppSeries;