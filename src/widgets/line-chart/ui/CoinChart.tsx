 
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
import useCoinChartData from '../hooks/useCoinChartData';
import { CoinTimeSelector } from './CoinTimeSelector';
import ICoinTimeZoneValue from '../types/ICoinTimeZoneValue';
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton';
import { usePriceLines } from '../hooks/usePriceLines';

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

	const CoinTimeZone: IDropdownItem<ICoinTimeZoneValue>[] = [
		{ value: { id: '1', days: 1 }, label: t('24ч') },
		{ value: { id: '30', days: 30 }, label: t('30 д') },
		{ value: { id: '90', days: 90 }, label: t('90 д') },
		{ value: { id: '180', days: 180 }, label: t('180 д') },
		{ value: { id: '365', days: 365 }, label: t('1 год') },
	];

	/** Текущий выбранный диапазон */
	const [labelDropDownTimeZone, setLabelDropDownTimeZone] =
        useState<IDropdownItem<ICoinTimeZoneValue>>(CoinTimeZone[0]);

	/** Данные графика и монеты из API */
	const { chartData, chartIsLoading, chartError, coinData, coinError } =
        useCoinChartData(coinId, labelDropDownTimeZone.value.id);

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

		firstSeries?.setData(chartData.prices);

		firstSeries?.addSubscribeCrosshairMove((dataPoint) => {
			if (dataPoint) {
				const price = Utils.Number.formatPrice(dataPoint.value);
				setCurrentCrosshairPrice(`$ ${price}`);
				return;
			}

			setCurrentCrosshairPrice('');
		});
        

	}, [chartManagerRef, chartData]);

	// Ошибки/загрузка
	if (chartIsLoading || !chartData) {
		return <Skeleton baseColor="#2b2b39" borderRadius={12} />;
	}
	if (!chartData && chartError) return <div>{t('Ошибка загрузки')}</div>;
	if (!coinData && coinError) return <div>{t('Ошибка загрузки')}</div>;

	// Выбор таймфрейма на графике
	const handleSelectTimeZone = (value: IDropdownItem<IBaseMenuItemValue>) => {
		const option = CoinTimeZone.find((o) => o.value.id === value.value.id);
		if (option) setLabelDropDownTimeZone(option);
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
						options={CoinTimeZone}
						value={labelDropDownTimeZone}
						onSelect={handleSelectTimeZone}
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