export interface ICurrencyMap {
    [currencyCode: string]: number; // например btc, eth, usd и т.п.
}

export interface IGlobalData {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: ICurrencyMap;
    total_volume: ICurrencyMap;
    market_cap_percentage: ICurrencyMap;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
}

export interface IGlobalResponse {
    data: IGlobalData;
}