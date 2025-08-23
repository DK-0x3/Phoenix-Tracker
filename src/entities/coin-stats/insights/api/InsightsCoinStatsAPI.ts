import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponseFearAndGreed } from '../model/IResponseFearAndGreed';
import { ENV } from '../../../../shared/types/ENV';

/**
 * API для получения статистики по индикаторам и идеям через CoinStats.
 */
export const InsightsCoinStatsAPI = createApi({
	reducerPath: 'insightsCoinStatsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.coinStatsApiUrl + '/insights',
		prepareHeaders: (headers) => {
			headers.set('X-API-KEY', ENV.coinStatsApiKey);
			return headers;
		},
	}),
	tagTypes: [],
	endpoints: builder => ({
		/**
         * Получает данные индикатора Страха и Жадности.
         *
         * @endpoint GET /insights/fear-and-greed
         * @returns {IResponseFearAndGreed} данные индикатора
         */
		fetchFearAndGreed: builder.query<IResponseFearAndGreed, void>({
			query: () => '/fear-and-greed',
			transformResponse: (response: IResponseFearAndGreed) => ({
				...response,
				fetchedAt: new Date().toISOString(),
			}),
		}),
	}),
});