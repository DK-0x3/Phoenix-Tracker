import { useEffect, useRef } from 'react';
import {
	createChart,
	LineSeries,
	// eslint-disable-next-line import/named
	LineSeriesOptions, LineData, IChartApi, ISeriesApi, ChartOptions, DeepPartial, PriceLineOptions, IPriceLine
} from 'lightweight-charts';

export interface ILightWeightChartLineProps {
    chartOptions: DeepPartial<ChartOptions>;
    data: {
        lineData: LineData[],
        config: DeepPartial<LineSeriesOptions>,
    }[],
}

export function useLightWeightChartLine(props: ILightWeightChartLineProps) {
	const { data, chartOptions } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<'Line'>[]>([]);
	const priceLinesRef = useRef<Map<number, IPriceLine[]>>(new Map());

	useEffect(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, chartOptions);
		chartRef.current = chart;

		if (data.length === 0) {
			// просто выходим, не ломая порядок хуков
			return () => {
				chart.remove();
			};
		}

		const series: ISeriesApi<'Line'>[] = [];

		data.forEach((lineInfo) => {
			const line = chart.addSeries(LineSeries, lineInfo.config);
			series.push(line);
			line.setData(lineInfo.lineData);
		});

		seriesRef.current = series;

		return () => {
			chart.remove();
		};
	}, [JSON.stringify(data)]);
    
	/** 🔧 Обновить все данные серии */
	const updateLineData = (seriesIndex: number, lineData: LineData[]) => {
		const lineSeries = seriesRef.current[seriesIndex];
		if (!lineSeries) throw new Error(`Series ${seriesIndex} not found`);
		lineSeries.setData(lineData);
	};

	/** 🔧 Добавить новую точку в конец (например, для real-time обновлений) */
	const updateLastPoint = (seriesIndex: number, point: LineData) => {
		const lineSeries = seriesRef.current[seriesIndex];
		if (!lineSeries) throw new Error(`Series ${seriesIndex} not found`);
		lineSeries.update(point);
	};

	const togglePriceLine = (seriesIndex: number, options: PriceLineOptions, enable: boolean) => {
		const lineSeries = seriesRef.current[seriesIndex];
		if (!lineSeries) {
			throw new Error('The seriesIndex is required in Series');
		}

		if (!options.id) {
			throw new Error('The id is required in Options');
		}

		const map = priceLinesRef.current;

		let priceLines = map.get(seriesIndex);
		if (!priceLines) {
			map.set(seriesIndex, []);
			priceLines = [];
		}

		if (enable) {
			if (priceLines.find(line => line.options().id === options.id)) {
				console.warn('The price line already exists');
				return;
			}

			const priceLine = lineSeries.createPriceLine(options);
			priceLines.push(priceLine);
			map.set(seriesIndex, priceLines);
		} else {
			const priceLineIndex = priceLines.findIndex(line => line.options().id === options.id);

			if (priceLineIndex == -1) {
				console.warn('The price line does not exist');
				return;
			}
            
			lineSeries.removePriceLine(priceLines[priceLineIndex]);
			priceLines.splice(priceLineIndex, 1);
			map.set(seriesIndex, priceLines);
		}
	};

	return { containerRef, chart: chartRef, series: seriesRef, updateLineData, updateLastPoint, togglePriceLine };
}
