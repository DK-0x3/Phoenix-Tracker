import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICBRResponse } from '../model/CBRResponse';

/**
 * API для получения курсов валют от Центробанка России (CBR).
 */
export const CbrAPI = createApi({
	reducerPath: 'cbrAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://www.cbr-xml-daily.ru/daily_json.js',
	}),
	tagTypes: [],
	endpoints: builder => ({
		/**
         * Получает актуальные курсы фиатных валют.
         *
         * @endpoint GET /daily_json.js
         * @returns {ICBRResponse} объект с курсами валют и дополнительными метаданными
         * @cache 5 минут (300 сек.)
         */
		getRatesFiatCurrencies: builder.query<ICBRResponse, void>({
			query: () => '',
			transformResponse: (response: ICBRResponse) => ({
				...response,
				fetchedAt: new Date().toISOString(),
			}),
		})
	}),
});