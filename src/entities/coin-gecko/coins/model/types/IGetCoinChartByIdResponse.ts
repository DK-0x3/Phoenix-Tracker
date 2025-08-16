// eslint-disable-next-line import/named
import { LineData } from 'lightweight-charts';

interface IGetCoinChartByIdResponse {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

export interface IGetCoinChartByIdResponseData {
    prices: LineData[];
    marketCaps: LineData[];
    totalVolumes: LineData[];
}

export interface IGetCoinChartByIdParams {
    coinId: string;
    vsCurrency?: string;
    days?: string;
}

export default IGetCoinChartByIdResponse;