import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import IFiatCurrencyResponse, { IFiatCurrencyCoinStats } from '../model/IFiatCurrencyStatsResponse';


/**
 * API для получения статистики по монетам через CoinStats.
 */
export const FiatsStatsAPI = createApi({
	reducerPath: 'fiatStatsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.coinStatsApiUrl + '/fiats',
		prepareHeaders: (headers) => {
			headers.set('X-API-KEY', ENV.coinStatsApiKey);
			return headers;
		},
	}),
	tagTypes: [],
	endpoints: builder => ({
		/**
         * Получает актуальные курсы фиатных валют.
         *
         * @endpoint GET /fiats
         * @returns {ICBRResponse} объект с курсами валют и дополнительными метаданными
         * @cache 5 минут (300 сек.)
         */
		getFiatCurrencies: builder.query<IFiatCurrencyResponse, void>({
			query: () => '',
			transformResponse: (response: IFiatCurrencyCoinStats[]) => {
				const result: IFiatCurrencyResponse = {
					fetchedAt: new Date().toISOString(),
					result: [],
				};
                
				response.forEach(currency => {
					result.result.push(currency);
				});

				return result;
			},
		}),
	}),
});