import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import IGetListCoinGeckoResponse from '../model/types/IGetListCoinGeckoResponse';
import IGetCoinsMarketsGeckoResponse from '../model/types/IGetCoinsMarketsGeckoResponse';
import IGetCoinsMarketsGeckoParams from '../model/types/IGetCoinsMarketsGeckoParams';
import { ICoin } from '../../../../shared/types/ICoin';

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
		getListCoins: builder.query<IGetListCoinGeckoResponse[], void>({
			query: () => '/list',
			keepUnusedDataFor: 86400, // кэш на 24 часа
		}),
		getCoinsMarkets: builder.query<ICoin[], IGetCoinsMarketsGeckoParams>({
			query: (params) => {
				const path = '/markets';
				const defaultVsCurrency = 'usd';
				const defaultPriceChangePercentage = '1h,24h,7d';
				const defaultPerPage = '100';
				const defaultPage = '1';

				if (!params) return path;

				const queryParams = new URLSearchParams();

				if (params.vs_currency !== undefined) {
					queryParams.append('vs_currency', params.vs_currency);
				} else {
					queryParams.append('vs_currency', defaultVsCurrency);
				}

				if (params.ids !== undefined) queryParams.append('ids', params.ids.join(','));

				// queryParams.append('ids', 'bitcoin,ethereum');

				if (params.price_change_percentage !== undefined) {
					queryParams.append('price_change_percentage', params.price_change_percentage.join(','));
				} else {
					queryParams.append('price_change_percentage', defaultPriceChangePercentage);
				}

				if (params.limit !== undefined) {
					queryParams.append('per_page', params.limit.toString());
				} else {
					queryParams.append('per_page', defaultPerPage);
				}

				if (params.page !== undefined) {
					queryParams.append('page', params.page.toString());
				} else {
					queryParams.append('page', defaultPage);
				}

				const queryString = queryParams.toString();
				return `${path}${queryString ? `?${queryString}` : ''}`;
			},
			keepUnusedDataFor: 300,
			transformResponse: (response: IGetCoinsMarketsGeckoResponse[]) => {
				const coins: ICoin[] = [];

				response.forEach(coinResponse => {
					coins.push({
						id: coinResponse.id,
						icon: coinResponse.image,
						name: coinResponse.name,
						symbol: coinResponse.symbol,
						rank: coinResponse.market_cap_rank,
						price: coinResponse.current_price,
						priceBtc: null,
						volume: coinResponse.market_cap_change_24h,
						marketCap: coinResponse.market_cap,
						availableSupply: coinResponse.circulating_supply,
						totalSupply: coinResponse.total_supply,
						fullyDilutedValuation: coinResponse.fully_diluted_valuation,
						priceChange1h: coinResponse.price_change_percentage_1h_in_currency ?
							coinResponse.price_change_percentage_1h_in_currency : 0,
						priceChange1d: coinResponse.price_change_percentage_24h_in_currency ?
							coinResponse.price_change_percentage_24h_in_currency : 0,
						priceChange1w: coinResponse.price_change_percentage_7d_in_currency ?
							coinResponse.price_change_percentage_7d_in_currency : 0,
						redditUrl: null,
						twitterUrl: null,
						contractAddresses: null,
						explorers: null,
					});
				});

				return coins;
			}
		})
	}),
});

export const { useGetListCoinsQuery, useGetCoinsMarketsQuery, useLazyGetCoinsMarketsQuery } = CoinsGeckoAPI;