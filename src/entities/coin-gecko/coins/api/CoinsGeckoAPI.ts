import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import ICoinGeckoResponse from '../model/types/ICoinGeckoResponse';

export const CoinsGeckoAPI = createApi({
	reducerPath: 'coinsGeckoAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: ENV.coinGeckoApiUrl + '/coins',
		prepareHeaders: (headers) => {
			headers.set('x-cg-api-key', ENV.coinGeckoApiKey);
			return headers;
		},
	}),
	tagTypes: [],
	endpoints: builder => ({
		getListCoins: builder.query<ICoinGeckoResponse[], void>({
			query: () => '/list',
			keepUnusedDataFor: 86400, // кэш на 24 часа
		}),
		// getCoinById: builder.query<ICoin, string>({
		// 	query: (coinId) => `/coins/${coinId}`,
		// 	keepUnusedDataFor: 300, // кэш на 5 минут
		// 	transformResponse: (response: ICoin) => ({
		// 		...response,
		// 	}),
		// }),
	}),
});

export const { useGetListCoinsQuery } = CoinsGeckoAPI;