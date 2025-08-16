// eslint-disable-next-line import/named
import { ColorType, CrosshairMode, LineStyle, PriceLineOptions } from 'lightweight-charts';
import { useLightWeightChartLine } from '../../../entities/light-charts/hooks/useLightWeightChartLine';
import { FC, useEffect } from 'react';
import styles from './LineChart.module.scss';
import { cn } from '../../lib/cn/cn';
import { ToggleSwitch } from '../toggle-switch/ToggleSwitch';
import { useGetCoinByIdQuery, useGetCoinChartByIdQuery } from '../../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { Skeleton } from '../skeleton/Skeleton';
import { useTranslation } from 'react-i18next';

type ICoinLineChartProps = {
    isEnableOptions: boolean;
    coinId: string;
    className?: string;
};

export const LineChart: FC<ICoinLineChartProps> = (props) => {
	const { isEnableOptions, className, coinId } = props;
	const { t } = useTranslation();

	const priceLineATHOptins: PriceLineOptions = {
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
	const priceLineATLOptins: PriceLineOptions = {
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

	const { data: chartData, isLoading: chartIsLoading, error: chartError } = useGetCoinChartByIdQuery({ coinId });
	const { data: coinData, isLoading: coinIsLoading, error: coinError } = useGetCoinByIdQuery(coinId);

	const { containerRef, togglePriceLine } = useLightWeightChartLine({
		data: [{
			lineData: chartData?.prices ?? [],
			config: {
				color: '#F7A600',
			}
		}],
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
		if (!coinData) return;

		priceLineATHOptins.price = coinData.market_data.ath.usd ?? 0;
		priceLineATLOptins.price = coinData.market_data.atl.usd ?? 0;
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
		if (isEnable) {
			togglePriceLine(0, priceLineATHOptins, true);
			return;
		}
		togglePriceLine(0, priceLineATHOptins, false);
	};

	const handleATL = (isEnable: boolean) => {
		if (isEnable) {
			togglePriceLine(0, priceLineATLOptins, true);
			return;
		}
		togglePriceLine(0, priceLineATLOptins, false);
	};

	return (
		<div className={cn(styles.LineChart, className, !isEnableOptions && styles.LineChartExpand)}>
			<div className={styles.MainChart} ref={containerRef}/>

			<div className={cn(!isEnableOptions && styles.OptionsHide, styles.Options)}>
				<div className={styles.TimeOption}>
					<div>
						24ч
					</div>
					<div>
						30д
					</div>
					<div>
						90д
					</div>
					<div>
						180д
					</div>
					<div>
						1год
					</div>
				</div>
				<div className={styles.OtherOptions}>
					<div>
						<ToggleSwitch label='ATH' onChange={handleATH}/>
					</div>

					<div>
						<ToggleSwitch label='ATL' onChange={handleATL}/>
					</div>
				</div>
			</div>
		</div>
	);
};