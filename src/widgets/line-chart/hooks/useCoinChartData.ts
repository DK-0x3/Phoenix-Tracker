import { CoinsGeckoAPI } from '../../../entities/coin-gecko/coins/api/CoinsGeckoAPI';

const useCoinChartData = (coinId: string, days: string) => {
	const { data: chartData, isLoading: chartIsLoading, error: chartError } =
        CoinsGeckoAPI.endpoints.getCoinChartById.useQuery({ coinId, days });
	const { data: coinData, isLoading: coinIsLoading, error: coinError } =
        CoinsGeckoAPI.endpoints.getCoinById.useQuery(coinId);

	return { chartData, chartIsLoading, chartError, coinData, coinIsLoading, coinError };
};

export default useCoinChartData;