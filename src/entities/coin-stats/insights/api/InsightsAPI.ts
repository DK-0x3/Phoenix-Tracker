import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponseFearAndGreed } from '../model/IResponseFearAndGreed';
import { ENV } from '../../../../shared/types/ENV';

export const InsightsAPI = createApi({
	reducerPath: 'insightsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.coinStatsApiUrl,
		prepareHeaders: (headers) => {
			// Добавляем заголовок X-API-KEY
			headers.set('X-API-KEY', ENV.coinStatsApiKey);
			return headers;
		},
	}),
	tagTypes: [],
	endpoints: builder => ({
		fetchFearAndGreed: builder.query<IResponseFearAndGreed, void>({
			query: () => '/insights/fear-and-greed',
		}),
	}),
});

export const { useFetchFearAndGreedQuery } = InsightsAPI;