import {
	AreaSeries,
	BarSeries,
	BaselineSeries,
	CandlestickSeries,
	// eslint-disable-next-line import/named
	HistogramSeries, IChartApi, ISeriesApi, LineSeries, SeriesOptionsMap
} from 'lightweight-charts';

/**
 * Соответствие между типами серий и их конструкторами.
 */
interface ISeriesCtorMap {
    Line: typeof LineSeries;
    Bar: typeof BarSeries;
    Area: typeof AreaSeries;
    Histogram: typeof HistogramSeries;
    Baseline: typeof BaselineSeries;
    Candlestick: typeof CandlestickSeries;
}

/**
 * Типизированная фабрика для создания серий на графике.
 * @example
 * ```ts
 * const lineSeries = SeriesFactory.Line(chart, { color: 'blue' });
 * ```
 */
type ISeriesFactory = {
    [K in keyof ISeriesCtorMap]: (
        chart: IChartApi,
        options: SeriesOptionsMap[K]
    ) => ISeriesApi<K>;
};

/**
 * Фабрика для добавления серий на график lightweight-charts.
 *
 * Позволяет создавать серии по типу:
 * ```ts
 * const lineSeries = SeriesFactory.Line(chart, { color: 'blue' });
 * ```
 */
const SeriesFactory: ISeriesFactory = {
	Line: (chart, options) => chart.addSeries(LineSeries, options),
	Bar: (chart, options) => chart.addSeries(BarSeries, options),
	Area: (chart, options) => chart.addSeries(AreaSeries, options),
	Histogram: (chart, options) => chart.addSeries(HistogramSeries, options),
	Baseline: (chart, options) => chart.addSeries(BaselineSeries, options),
	Candlestick: (chart, options) => chart.addSeries(CandlestickSeries, options),
};

export default SeriesFactory;