import {
	// eslint-disable-next-line import/named
	ChartOptions, createChart, DeepPartial, IChartApi, MouseEventParams, SeriesType,
} from 'lightweight-charts';
import AppSeries, { SeriesDataItem } from './AppSeries';
import AnyAppSeries from '../types/AnyAppSeries';


/**
 * Менеджер для работы с lightweight-charts.
 *
 * Инкапсулирует создание графика, управление сериями данных,
 * обработку событий (например, движение crosshair)
 * и предоставляет удобный API для работы с графиком.
 */
class LightWeightChartManager {
	private chart: IChartApi;
	private series: AnyAppSeries[] = [];

	/**
     * Создаёт экземпляр менеджера графика.
     *
     * @param container - HTML-элемент контейнера для графика
     * @param chartOptions - опции для конфигурации графика (layout, grid, crosshair и т.д.)
     */
	constructor(container: HTMLDivElement, chartOptions: DeepPartial<ChartOptions>) {
		this.chart = createChart(container, chartOptions);

		this.chart.subscribeCrosshairMove(this.onCrosshairMove);
	}

	/**
     * Добавляет новую серию данных на график.
     *
     * @param series - экземпляр AppSeries (обёртки над серией lightweight-charts)
     * @returns API серии, полученное через lightweight-charts
     */
	public addSeries = (series: AnyAppSeries) => {
		series.connectToChart(this.chart);
		this.series.push(series);

		return series.getApi();
	};

	/**
     * Возвращает список всех добавленных серий.
     *
     * @returns массив серий (AnyAppSeries[])
     */
	public getSeries = () => this.series;

	/**
     * Возвращает первую серию по её типу.
     *
     * @typeParam T - тип серии (Line, Area, Bar, Candlestick и т.д.)
     * @param type - тип серии
     * @returns AppSeries<T> или null, если серия не найдена
     */
	public getFirstSeries<T extends SeriesType>(type: T): AppSeries<T> | null {
		const series = this.series.find(s => s.type === type) as AppSeries<T> | undefined;
		return series ?? null;
	}

	/**
     * Обработчик события перемещения crosshair.
     *
     * Вызывает подписчиков каждой серии и передаёт им точку данных,
     * если она доступна.
     *
     * @param param - параметры события движения crosshair
     */
	private onCrosshairMove = (param: MouseEventParams) => {
		this.series.forEach((seri: AnyAppSeries) => {
			const seriesApi = seri.getApi();

			if (seriesApi !== null) {
				const rawPoint = param.seriesData.get(seriesApi);
				const point: SeriesDataItem<typeof seri.type> | null = rawPoint
					? (rawPoint as SeriesDataItem<typeof seri.type>)
					: null;

				const subscribers = seri.getCrosshairMoveSubscribes();
				subscribers.forEach(subscriber => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					subscriber(point);
				});
			}
		});
	};

	/**
     * Уничтожает график и освобождает ресурсы.
     */
	public destroy = () => {
		this.chart.remove();
	};
}

export default LightWeightChartManager;