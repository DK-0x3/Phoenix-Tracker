import { BaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../../../../shared/types/ENV';
import IGetListCoinGeckoResponse from '../model/types/IGetListCoinGeckoResponse';
import IGetCoinsMarketsGeckoResponse from '../model/types/IGetCoinsMarketsGeckoResponse';
import IGetCoinsMarketsGeckoParams from '../model/types/IGetCoinsMarketsGeckoParams';
import { ICoin } from '../../../../shared/types/ICoin';
import IGetCoinChartByIdResponse, {
	IGetCoinChartByIdParams,
	IGetCoinChartByIdResponseData
} from '../model/types/IGetCoinChartByIdResponse';
// eslint-disable-next-line import/named
import { UTCTimestamp } from 'lightweight-charts';
import IGetCoinByIdResponse from '../model/types/getCoinById/IGetCoinByIdResponse';

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
		}),
		getCoinChartById: builder.query<IGetCoinChartByIdResponseData, IGetCoinChartByIdParams>({
			query: (params) => {
				const path = `/${params.coinId}/market_chart`;

				const vsCurrency = params.vsCurrency ? params.vsCurrency : 'usd';
				const days = params.days ? params.days : '1';

				if (!params) return path;

				const queryParams = new URLSearchParams();

				queryParams.append('vs_currency', vsCurrency);
				queryParams.append('days', days);

				const queryString = queryParams.toString();
				return `${path}${queryString ? `?${queryString}` : ''}`;
			},
			keepUnusedDataFor: 300,
			transformResponse: (response: IGetCoinChartByIdResponse) => {
				const result: IGetCoinChartByIdResponseData = {
					prices: [],
					marketCaps: [],
					totalVolumes: [],
				};

				console.log(response);

				response.prices.forEach(dotInfo => {
					const time = dotInfo[0] ? dotInfo[0] : 0;
					const price = dotInfo[1] ? dotInfo[1] : 0;

					result.prices.push({
						time: Math.floor(time / 1000) as UTCTimestamp,
						value: price,
					});
				});

				return result;
			}
		}),
		getCoinById: builder.query<IGetCoinByIdResponse, string>({
			query: (coinId) => `/${coinId}`,
			keepUnusedDataFor: 300,
			transformResponse: (response: IGetCoinByIdResponse) => {
				return response;
			},
		})
	}),
});

export const {
	useGetListCoinsQuery,
	useGetCoinsMarketsQuery,
	useLazyGetCoinsMarketsQuery,
	useGetCoinChartByIdQuery,
	useGetCoinByIdQuery,
} = CoinsGeckoAPI;