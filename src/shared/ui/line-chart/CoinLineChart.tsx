// eslint-disable-next-line import/named
import { ColorType, CrosshairMode, LineData, LineStyle, PriceLineOptions } from 'lightweight-charts';
import { useLightWeightChartLine } from '../../../entities/light-charts/hooks/useLightWeightChartLine';
import { FC, useEffect, useState } from 'react';
import styles from './CoinLineChart.module.scss';
import { cn } from '../../lib/cn/cn';
import { ToggleSwitch } from '../toggle-switch/ToggleSwitch';
import {
	CoinsGeckoAPI,
} from '../../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { Skeleton } from '../skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import IDropdownItem from '../drop-down-list-menu/types/IDropdownItem';
import IBaseMenuItemValue from '../drop-down-list-menu/types/IBaseMenuItemValue';
import { DropdownMenu } from '../drop-down-list-menu/DropDownListMenu';
import Utils from '../../lib/utils/Utils';

type ICoinLineChartProps = {
    isEnableOptions: boolean;
    coinId: string;
    className?: string;
};

interface ICoinTimeZoneValue extends IBaseMenuItemValue {
    days: number;
}

export const CoinLineChart: FC<ICoinLineChartProps> = (props) => {
	const { isEnableOptions, className, coinId } = props;
	const { t } = useTranslation();

	const [currentCrosshairPrice, setCurrentCrosshairPrice] = useState<string>('');

	const CoinTimeZone: IDropdownItem<ICoinTimeZoneValue>[] = [
		{ value: { id: '1', days: 1 }, label: t('24ч') },
		{ value: { id: '30', days: 30 }, label: t('30 д') },
		{ value: { id: '90', days: 90 }, label: t('90 д') },
		{ value: { id: '180', days: 180 }, label: t('180 д') },
		{ value: { id: '365', days: 365 }, label: t('1 год') },
	];

	const [labelDropDownTimeZone, setLabelDropDownTimeZone] =
        useState<IDropdownItem<ICoinTimeZoneValue>>(CoinTimeZone[0]);

	const priceLineATOptions: PriceLineOptions = {
		id: 'ATH',
		price: 0.6,
		color: '#4b00f9',
		lineWidth: 2,
		lineStyle: LineStyle.LargeDashed,
		axisLabelVisible: true,
		title: 'ATH',
		lineVisible: true,
		axisLabelColor: 'black',
		axisLabelTextColor: 'white',
	};
	const priceLineATLOptions: PriceLineOptions = {
		id: 'ATL',
		price: 5,
		color: '#ff0000',
		lineWidth: 1,
		lineStyle: LineStyle.LargeDashed,
		axisLabelVisible: true,
		title: 'ATL',
		lineVisible: true,
		axisLabelColor: 'black',
		axisLabelTextColor: 'white',
	};

	const { data: chartData, isLoading: chartIsLoading, error: chartError } =
        CoinsGeckoAPI.endpoints.getCoinChartById.useQuery({ coinId, days: labelDropDownTimeZone.value.id });
	const { data: coinData, error: coinError } = CoinsGeckoAPI.endpoints.getCoinById.useQuery(coinId);

	const { containerRef, togglePriceLine, chart, series } = useLightWeightChartLine({
		data: [
			{
				lineData: chartData?.prices ?? [],
				config: {
					color: '#F7A600',
				}
			}
		],
		chartOptions: {
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
		}
	});

	useEffect(() => {
		if (!chart.current || !series.current) return;

		chart.current.subscribeCrosshairMove(param => {
			if (param.time) {
				const dataPoint = param.seriesData.get(series.current[0]) as LineData;
				const price = Utils.Number.formatPrice(dataPoint.value);

				setCurrentCrosshairPrice(`$ ${price}`);
			} else {
				setCurrentCrosshairPrice('');
			}
		});


		// setTimeout(() => {
		// 	if (chartData) {
		// 		series.current[0].setData(chartData.marketCaps);
		// 		series.current[0].applyOptions({
		// 			color: '#FF0000'
		// 		});
		// 	}
		// }, 2000);
	}, [chart, series, chartData]);

	useEffect(() => {
		if (!coinData) return;

		priceLineATOptions.price = coinData.market_data.ath.usd ?? 0;
		priceLineATLOptions.price = coinData.market_data.atl.usd ?? 0;
	}, [coinData]);

	if (chartIsLoading || !chartData) {
		return (
			<Skeleton
				baseColor='#2b2b39'
				borderRadius={12}
			/>
		);
	}

	if (!chartData && chartError) {
		return <div>{t('Ошибка загрузки')}</div>;
	}
	if (!coinData && coinError) {
		return <div>{t('Ошибка загрузки')}</div>;
	}

	const handleATH = (isEnable: boolean) => {
		priceLineATOptions.price = coinData?.market_data.ath.usd ?? 0;
		priceLineATLOptions.price = coinData?.market_data.atl.usd ?? 0;
        
		if (isEnable) {
			togglePriceLine(0, priceLineATOptions, true);
			return;
		}
		togglePriceLine(0, priceLineATOptions, false);
	};

	const handleATL = (isEnable: boolean) => {
		priceLineATOptions.price = coinData?.market_data.ath.usd ?? 0;
		priceLineATLOptions.price = coinData?.market_data.atl.usd ?? 0;
        
		if (isEnable) {
			togglePriceLine(0, priceLineATLOptions, true);
			return;
		}
		togglePriceLine(0, priceLineATLOptions, false);
	};

	const handleSelectTimeZone = (value: IDropdownItem<IBaseMenuItemValue>) => {
		CoinTimeZone.forEach((option) => {
			if (option.value.id === value.value.id) {
				setLabelDropDownTimeZone(option);
				return;
			}
		});
	};

	return (
		<div className={cn(styles.LineChart, className, !isEnableOptions && styles.LineChartExpand)}>
			<div className={styles.MainChartContainer}>
				<div className={styles.MainChart} ref={containerRef}/>

				<div className={styles.MainChartOverlay}>
					{currentCrosshairPrice}
				</div>
			</div>

			<div className={cn(!isEnableOptions && styles.OptionsHide, styles.Options)}>
				<div className={styles.TimeOption}>
					<DropdownMenu
						buttonStyle={{
							backgroundColor: 'transparent',
							border: '1px solid var(--dark-gray)',
							boxShadow: 'none',
						}}
						menuStyle={{
							backgroundColor: 'var(--color-dark-600)',
							display: 'flex',
						}}
						itemClassName={styles.DropDownTimeItem}
						onSelect={handleSelectTimeZone}
						label={labelDropDownTimeZone.label}
						items={CoinTimeZone}
						placement='top'
					/>
				</div>

				<div className={styles.OtherOptions}>
					<div>
						<ToggleSwitch
							backgroundColorChecked='var(--orange)'
							label='ATH'
							onChange={handleATH}
						/>
					</div>

					<div>
						<ToggleSwitch
							backgroundColorChecked='var(--orange)'
							label='ATL'
							onChange={handleATL}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};