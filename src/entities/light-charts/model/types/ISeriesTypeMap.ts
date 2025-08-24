import {
	// eslint-disable-next-line import/named
	AreaData, AreaSeriesOptions, BarData, BarSeriesOptions, BaselineData,
	// eslint-disable-next-line import/named
	BaselineSeriesOptions, CandlestickData, CandlestickSeriesOptions, CustomData,
	// eslint-disable-next-line import/named
	CustomSeriesOptions, HistogramData, HistogramSeriesOptions, LineData, LineSeriesOptions
} from 'lightweight-charts';

export interface ISeriesTypeMap {
    Line: {
        data: LineData;
        options: LineSeriesOptions;
    };
    Bar: {
        data: BarData;
        options: BarSeriesOptions;
    };
    Histogram: {
        data: HistogramData;
        options: HistogramSeriesOptions;
    };
    Area: {
        data: AreaData;
        options: AreaSeriesOptions;
    };
    Candlestick: {
        data: CandlestickData;
        options: CandlestickSeriesOptions
    };
    Baseline: {
        data: BaselineData;
        options: BaselineSeriesOptions;
    };
    Custom: {
        data: CustomData;
        options: CustomSeriesOptions;
    }
}