import { IFiatCurrency } from './IFiatCurrency';

export interface ICBRResponse {
    Date: string;             // "2025-08-23T11:30:00+03:00"
    PreviousDate: string;     // "2025-08-22T11:30:00+03:00"
    PreviousURL: string;      // "//www.cbr-xml-daily.ru/archive/2025/08/22/daily_json.js"
    Timestamp: string;        // "2025-08-22T19:00:00+03:00"
    Valute: {
        [key: string]: IFiatCurrency;  // например { "USD": Currency, "EUR": Currency, "CNY": Currency }
    };
    fetchedAt: string;
}