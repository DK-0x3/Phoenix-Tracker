import { useEffect, useRef } from 'react';
import {
	createChart,

	LineSeries,
	CandlestickSeries,
	AreaSeries,
	// eslint-disable-next-line import/named
	HistogramSeries, LineSeriesOptions, LineData, CandlestickSeriesOptions, CandlestickData, AreaSeriesOptions,
	// eslint-disable-next-line import/named
	HistogramSeriesOptions, AreaData, HistogramData, IChartApi, ISeriesApi, ChartOptions, DeepPartial, SeriesDefinition,
} from 'lightweight-charts';



// Типы для выбора серии
export type SeriesTypeMap = {
    line: { options: LineSeriesOptions; data: LineData };
    candlestick: { options: CandlestickSeriesOptions; data: CandlestickData };
    area: { options: AreaSeriesOptions; data: AreaData };
    histogram: { options: HistogramSeriesOptions; data: HistogramData };
};

type SeriesType = keyof SeriesTypeMap;

export function useLightweightChart<T extends SeriesType>(
	chartOptions: DeepPartial<ChartOptions>,
	seriesConfig: { type: T; options?: SeriesTypeMap[T]['options'] },
	data: SeriesTypeMap[T]['data'][]
) {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<SeriesTypeMap[T]['data']> | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, {
			...chartOptions,
		});
		chartRef.current = chart;

		let series: ISeriesApi<any>;
		switch (seriesConfig.type) {
		case 'line':
			series = chart.addSeries(LineSeries, seriesConfig.options);
			break;
		case 'candlestick':
			series = chart.addSeries(CandlestickSeries, seriesConfig.options);
			break;
		case 'area':
			series = chart.addSeries(AreaSeries, seriesConfig.options);
			break;
		case 'histogram':
			series = chart.addSeries(HistogramSeries, seriesConfig.options);
			break;
		}

		seriesRef.current = series;
		series.setData(data);

		// ResizeObserver для отслеживания любых изменений размера контейнера
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				chartRef.current?.applyOptions({ width, height });
			}
		});

		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
			chart.remove();
		};
	}, [seriesConfig.type, JSON.stringify(seriesConfig.options)]);

	return { containerRef, chart: chartRef, series: seriesRef };
}
