import { useEffect } from 'react';
import { IResponseFearAndGreed } from '../../../../entities/coin-stats/insights/model/IResponseFearAndGreed';
import { useFetchFearAndGreedQuery } from '../../../../entities/coin-stats/insights/api/InsightsAPI';
// eslint-disable-next-line import/named
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// eslint-disable-next-line import/named
import { SerializedError } from '@reduxjs/toolkit';
import { isExpiredByUTC } from '../../../../shared/lib/date/isExpiredByUTC';

export interface IUseFearAndGreedData {
    data: IResponseFearAndGreed | null,
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

/**
 * Хук получения индекса страха и жадности с redux-persist и суточной валидностью.
 * Данные сохраняются в redux-кэше и обновляются после 00:00 по UTC.
 */
export const useFearAndGreedData = (): IUseFearAndGreedData => {
	const {
		data,
		isLoading,
		error,
		refetch,
	} = useFetchFearAndGreedQuery();

	useEffect(() => {
		if (data?.fetchedAt && isExpiredByUTC(data.fetchedAt)) {
			refetch();
		}
	}, [data, refetch]);

	return {
		data: data ?? null,
		isLoading,
		error,
	};
};