interface IGetCoinsMarketsGeckoParams {
    vs_currency?: string;
    ids?: string[];
    price_change_percentage?: string[];
    limit?: number;
    page?: number;
}

export default IGetCoinsMarketsGeckoParams;