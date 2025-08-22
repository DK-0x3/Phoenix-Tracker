import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import { IGlobalResponse } from '../model/types/IGlobalData';

/**
 * API для получения глобальной статистики по монетам через CoinGecko.
 */
export const GlobalGeckoAPI = createApi({
	reducerPath: 'globalGeckoAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.coinGeckoApiUrl + '/global',
		prepareHeaders: (headers) => {
			headers.set('x-cg-api-key', ENV.coinGeckoApiKey);
			return headers;
		},
	}),
	tagTypes: [],
	endpoints: builder => ({
		/**
         * Получить глобальные данные крипторынка (капитализация, объемы, доминация и др.).
         * @endpoint GET /global
         * @returns {IGlobalResponse} глобальные данные на рынке
         */
		getGlobalDataCoins: builder.query<IGlobalResponse, void>({
			query: () => '',
			keepUnusedDataFor: 400, // кэш 24 часа
			transformResponse: (response: IGlobalResponse) => {
				return response;
			}
		}),
	}),
});