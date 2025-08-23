import { useEffect } from 'react';
// eslint-disable-next-line import/named
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// eslint-disable-next-line import/named
import { SerializedError } from '@reduxjs/toolkit';
import Utils from '../../../../shared/lib/utils/Utils';
import { FiatsStatsAPI } from '../../../../entities/coin-stats/fiats/api/FiatsStatsAPI';
import IFiatCurrencyResponse from '../../../../entities/coin-stats/fiats/model/IFiatCurrencyStatsResponse';

export interface IUseFiatCurrencyData {
    data: IFiatCurrencyResponse | null,
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

/**
 * Хук получения курсов фиатных валют к рублю с redux-persist и суточной валидностью.
 * Данные сохраняются в redux-кэше и обновляются после 00:00 по UTC.
 */
export const useFiatCurrencyData = (): IUseFiatCurrencyData => {
	const {
		data,
		isLoading,
		error,
		refetch,
	} = FiatsStatsAPI.endpoints.getFiatCurrencies.useQuery();

	useEffect(() => {
		if (data?.fetchedAt && Utils.Date.isExpiredByTimeOfDay(data.fetchedAt, '00:00:00Z')) {
			refetch();
		}
	}, [data, refetch]);

	return {
		data: data ?? null,
		isLoading,
		error,
	};
};