import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import { ICoin } from '../../../../shared/types/ICoin';
import IGetCoinsResponseResponse from '../model/types/IGetCoinsResponce';
import IGetCoinsParams from '../model/types/IGetCoinsParams';

export const CoinsStatsAPI = createApi({
	reducerPath: 'coinsStatsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.coinStatsApiUrl + '/coins',
		prepareHeaders: (headers) => {
			headers.set('X-API-KEY', ENV.coinStatsApiKey);
			return headers;
		},
	}),
	tagTypes: [],
	endpoints: builder => ({
		getCoinById: builder.query<ICoin, string>({
			query: (coinId) => `/${coinId}`,
			keepUnusedDataFor: 300,
			transformResponse: (response: ICoin) => ({
				...response,
			}),
		}),
		getCoins: builder.query<IGetCoinsResponseResponse, IGetCoinsParams | void>({
			query: (params) => {
				if (!params) return '';

				const queryParams = new URLSearchParams();

				if (params.page !== undefined) queryParams.append('page', params.page.toString());
				if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
				if (params.currency) queryParams.append('currency', params.currency);
				if (params.name) queryParams.append('name', params.name);
				if (params.symbol) queryParams.append('symbol', params.symbol);

				const queryString = queryParams.toString();
				return `${queryString ? `?${queryString}` : ''}`;
			},
			keepUnusedDataFor: 300,
		})
	}),
});

export const { useGetCoinByIdQuery, useGetCoinsQuery } = CoinsStatsAPI;