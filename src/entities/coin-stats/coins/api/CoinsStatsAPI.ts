import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import { ICoin } from '../../../../shared/types/ICoin';
import IGetCoinsResponse from '../model/types/IGetCoinsResponce';
import IGetCoinsParams from '../model/types/IGetCoinsParams';


/**
 * API для получения статистики по монетам через CoinStats.
 */
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
		/**
         * Получает данные конкретной монеты по её идентификатору.
         *
         * @endpoint GET /coins/{coinId}
         * @param {string} coinId - идентификатор монеты
         * @returns {ICoin} данные монеты
         * @cache 5 минут (300 сек.)
         */
		getCoinById: builder.query<ICoin, string>({
			query: (coinId) => `/${coinId}`,
			keepUnusedDataFor: 300,
			transformResponse: (response: ICoin) => ({
				...response,
			}),
		}),

		/**
         * Получает список монет с возможностью фильтрации по странице, лимиту, валюте, имени или символу.
         *
         * @endpoint GET /coins
         * @param {IGetCoinsParams} [params] - параметры запроса:
         *   - page: номер страницы
         *   - limit: количество монет на странице
         *   - currency: валюта для цены
         *   - name: фильтр по имени монеты
         *   - symbol: фильтр по символу монеты
         * @returns {IGetCoinsResponse} список монет с метаданными
         * @cache 5 минут (300 сек.)
         */
		getCoins: builder.query<IGetCoinsResponse, IGetCoinsParams | void>({
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
		}),
	}),
});