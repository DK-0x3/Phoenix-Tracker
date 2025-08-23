export interface IFiatCurrencyCoinStats {
    name: string;
    rate: number;
    symbol: string;
    imageUrl: string;
}

interface IFiatCurrencyResponse {
    fetchedAt: string;
    result: IFiatCurrencyCoinStats[];
}

export default IFiatCurrencyResponse;