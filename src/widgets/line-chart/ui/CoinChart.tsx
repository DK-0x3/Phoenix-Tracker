import { ColorType, CrosshairMode } from 'lightweight-charts';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './CoinChart.module.scss';
import { cn } from '../../../shared/lib/cn/cn';
import { ToggleSwitch } from '../../../shared/ui/toggle-switch/ToggleSwitch';
import { useTranslation } from 'react-i18next';
import IDropdownItem from '../../../shared/ui/drop-down-list-menu/types/IDropdownItem';
import IBaseMenuItemValue from '../../../shared/ui/drop-down-list-menu/types/IBaseMenuItemValue';
import Utils from '../../../shared/lib/utils/Utils';
import LightWeightChartManager from '../../../entities/light-charts/model/services/LightWeightChartManager';
import AppSeries from '../../../entities/light-charts/model/services/AppSeries';
import { CoinTimeSelector } from './CoinTimeSelector';
import ICoinTimeZoneValue from '../types/ICoinTimeZoneValue';
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton';
import { usePriceLines } from '../hooks/usePriceLines';
import { CoinChartTypeSelector } from './CoinChartTypeSelector';
import { CoinsGeckoAPI } from '../../../entities/coin-gecko/coins/api/CoinsGeckoAPI';

type ICoinLineChartProps = {
    /** Включены ли опции (таймфрейм, ATH/ATL) */
    isEnableOptions: boolean;
    /** ID монеты */
    coinId: string;
    /** Дополнительный CSS-класс */
    className?: string;
};

/**
 * Компонент для отображения графика цены монеты.
 *
 * - Использует `lightweight-charts` для построения графика
 * - Подключается к CoinGecko API через RTK Query
 * - Позволяет включать/выключать линии ATH и ATL
 * - Поддерживает выбор диапазона (24ч, 30д, 90д, 180д, 1 год)
 */
export const CoinChart: FC<ICoinLineChartProps> = (props) => {
	const { isEnableOptions, className, coinId } = props;

	const { t } = useTranslation();

	/** Текущая цена под crosshair */
	const [currentCrosshairPrice, setCurrentCrosshairPrice] = useState<string>('');

	/** Контейнер для DOM-элемента графика */
	const chartRef = useRef<HTMLDivElement>(null);
	/** Менеджер графика (инкапсулирует работу lightweight-charts) */
	const chartManagerRef = useRef<LightWeightChartManager | null>(null);

	const CoinTimeZones: IDropdownItem<ICoinTimeZoneValue>[] = [
		{ value: { id: '1', days: 1 }, label: t('24ч') },
		{ value: { id: '30', days: 30 }, label: t('30 д') },
		{ value: { id: '90', days: 90 }, label: t('90 д') },
		{ value: { id: '180', days: 180 }, label: t('180 д') },
		{ value: { id: '365', days: 365 }, label: t('1 год') },
	];

	const CoinChartTypes: IDropdownItem<IBaseMenuItemValue>[] = [
		{ value: { id: 'Price' }, label: t('Цена') },
		{ value: { id: 'Market_Cap' }, label: t('Рын. Кап.') },
	];

	/** Текущий выбранный диапазон */
	const [labelDropDownTimeZone, setLabelDropDownTimeZone] =
        useState<IDropdownItem<ICoinTimeZoneValue>>(CoinTimeZones[0]);

	/** Текущий выбранный диапазон */
	const [labelDropDownChartType, setLabelDropDownChartType] =
        useState<IDropdownItem<IBaseMenuItemValue>>(CoinChartTypes[0]);

	/** Данные графика и монеты из API */
	const { data: chartData, isLoading: chartIsLoading, error: chartError } =
        CoinsGeckoAPI.endpoints.getCoinChartById.useQuery({ coinId, days: labelDropDownTimeZone.value.id });
	const { data: coinData, isLoading: coinIsLoading, error: coinError } =
        CoinsGeckoAPI.endpoints.getCoinById.useQuery(coinId);
	// const { chartData, chartIsLoading, chartError, coinData, coinError } =
	//     useCoinChartData(coinId, labelDropDownTimeZone.value.id);

	// Логика для работы с линиями ATH/ATL
	const { handleATH, handleATL } = usePriceLines(chartManagerRef, coinData);

	/**
     * Создаём график при первом монтировании
     */
	useEffect(() => {
		if (!chartRef.current) return;

		chartManagerRef.current = new LightWeightChartManager(chartRef.current, {
			autoSize: true,
			layout: {
				background: {
					type: ColorType.Solid,
					color: '#141519'
				},
				textColor: '#DDDDDD',
				fontFamily: 'Ubuntu',
				attributionLogo: false,
			},
			crosshair: {
				mode: CrosshairMode.Normal,
				vertLine: {
					labelBackgroundColor: '#2a2a2a'
				},
				horzLine: {
					labelBackgroundColor: '#2a2a2a',
				}
			},
			grid: {
				vertLines: {
					color: '#2a2a2a',
				},
				horzLines: {
					color: '#2a2a2a',
				}
			}
		});

		const series = new AppSeries('Line', chartData?.prices ?? [], { color: '#F7A600' });
		chartManagerRef.current.addSeries(series);

		return () => {
			chartManagerRef.current?.destroy();
		};
	}, []);

	/**
     * Обновляем данные графика и подписываемся на событие crosshair
     */
	useEffect(() => {
		if (!chartManagerRef.current || !chartData) return;
        
		const firstSeries = chartManagerRef.current.getFirstSeries('Line');
        
		if (labelDropDownChartType.value.id === 'Price') {
			firstSeries?.setData(chartData.prices);
            
			firstSeries?.setConfig({
				priceFormat: {
					type: 'price',
				},
				color: '#F7A600',
			});

			firstSeries?.removeSubscribeCrosshairMove('marketCap');
			firstSeries?.addSubscribeCrosshairMove((dataPoint) => {
				if (dataPoint) {
					const price = Utils.Number.formatPrice(dataPoint.value);
					setCurrentCrosshairPrice(`$ ${price}`);
					return;
				}

				setCurrentCrosshairPrice('');
			}, 'price');
		}

		if (labelDropDownChartType.value.id === 'Market_Cap') {
			firstSeries?.setConfig({
				priceFormat: {
					type: 'volume',
				},
				color: '#0077ff',
			});
            
			firstSeries?.removeSubscribeCrosshairMove('price');
			firstSeries?.addSubscribeCrosshairMove((dataPoint) => {
				if (dataPoint) {
					const price = Utils.Number.formatBigNumber(dataPoint.value);
					setCurrentCrosshairPrice(`$ ${price.number} ${price.symbol}`);
					return;
				}

				setCurrentCrosshairPrice('');
			}, 'marketCap');

			firstSeries?.setData(chartData.marketCaps);
		}
	}, [labelDropDownChartType, chartData]);

	// Ошибки/загрузка
	if (chartIsLoading || !chartData) {
		return <Skeleton baseColor="#2b2b39" borderRadius={12} />;
	}
	if (!chartData && chartError) return <div>{t('Ошибка загрузки')}</div>;
	if (!coinData && coinError) return <div>{t('Ошибка загрузки')}</div>;

	// Выбор таймфрейма на графике
	const handleSelectTimeZone = (value: IDropdownItem<ICoinTimeZoneValue>) => {
		const option = CoinTimeZones.find((o) => o.value.id === value.value.id);
		if (option) setLabelDropDownTimeZone(option);
	};

	const handleSelectChartType = (value: IDropdownItem<IBaseMenuItemValue>) => {
		const option = CoinChartTypes.find((o) => o.value.id === value.value.id);
		if (option) setLabelDropDownChartType(option);
	};

	return (
		<div className={cn(styles.LineChart, className, !isEnableOptions && styles.LineChartExpand)}>
			<div className={styles.MainChartContainer}>
				<div className={styles.MainChart} ref={chartRef}/>

				<div className={styles.MainChartOverlay}>
					{currentCrosshairPrice}
				</div>
			</div>

			<div className={cn(!isEnableOptions && styles.OptionsHide, styles.Options)}>
				<div className={styles.TimeOption}>
					<CoinTimeSelector
						items={CoinTimeZones}
						value={labelDropDownTimeZone}
						onSelect={handleSelectTimeZone}
					/>
					<CoinChartTypeSelector
						items={CoinChartTypes}
						value={labelDropDownChartType}
						onSelect={handleSelectChartType}
					/>
				</div>

				<div className={styles.OtherOptions}>
					{['ATH', 'ATL'].map((id) => (
						<ToggleSwitch
							key={id}
							backgroundColorChecked='var(--orange)'
							label={id}
							onChange={id === 'ATH' ? handleATH : handleATL}
						/>
					))}
				</div>
			</div>
		</div>
	);
};