import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import { IGlobalResponse } from '../model/types/IGlobalData';

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
		getGlobal: builder.query<IGlobalResponse, void>({
			query: () => '',
			keepUnusedDataFor: 400, // кэш 24 часа
			transformResponse: (response: IGlobalResponse) => {
				return response;
			}
		}),
	}),
});

export const { useGetGlobalQuery } = GlobalGeckoAPI;