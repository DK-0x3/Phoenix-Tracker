import { RefObject } from 'react';
// eslint-disable-next-line import/named
import { PriceLineOptions, LineStyle } from 'lightweight-charts';
import LightWeightChartManager from '../../../entities/light-charts/model/services/LightWeightChartManager';
import IGetCoinByIdResponse from '../../../entities/coin-gecko/coins/model/types/getCoinById/IGetCoinByIdResponse';

export const usePriceLines = (
	chartManagerRef: RefObject<LightWeightChartManager | null>,
	coinData: IGetCoinByIdResponse | undefined,
) => {
	const addLine = (id: string, price: number, color: string) => {
		const series = chartManagerRef.current?.getFirstSeries('Line');
		if (!series) return;

		const options: PriceLineOptions = {
			id,
			price,
			color,
			lineWidth: 2,
			lineStyle: LineStyle.LargeDashed,
			axisLabelVisible: true,
			title: id,
			lineVisible: true,
			axisLabelColor: 'black',
			axisLabelTextColor: 'white',
		};
		series.addPriceLine(options);
	};

	const removeLine = (id: string) => {
		chartManagerRef.current?.getFirstSeries('Line')?.removePriceLine(id);
	};

	const handleATH = (enabled: boolean) => {
		const price = coinData?.market_data.ath.usd ?? 0;

		if (enabled) {
			addLine('ATH', price, '#4b00f9');
			return;
		}

		removeLine('ATH');
	};

	const handleATL = (enabled: boolean) => {
		const price = coinData?.market_data.atl.usd ?? 0;

		if (enabled) {
			addLine('ATL', price, '#ff0000');
			return;
		}

		removeLine('ATL');
	};

	return { handleATH, handleATL };
};
