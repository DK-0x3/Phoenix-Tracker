import { useEffect } from 'react';
import { IResponseFearAndGreed } from '../../../entities/coin-stats/insights/model/IResponseFearAndGreed';
import { useFetchFearAndGreedQuery } from '../../../entities/coin-stats/insights/api/InsightsAPI';
// eslint-disable-next-line import/named
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// eslint-disable-next-line import/named
import { SerializedError } from '@reduxjs/toolkit';

export interface IUseFearAndGreedData {
    data: IResponseFearAndGreed | null,
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

// Проверка: истекла ли дневная валидность до 00:00 UTC
const isExpired = (fetchedAt: string) => {
	const now = new Date();
	const fetchedDate = new Date(fetchedAt);

	// День, когда данные были получены (UTC)
	const fetchedUTCDate = new Date(Date.UTC(
		fetchedDate.getUTCFullYear(),
		fetchedDate.getUTCMonth(),
		fetchedDate.getUTCDate()
	));

	// Следующий день 00:00 UTC
	const expiryTime = new Date(fetchedUTCDate.getTime() + 24 * 60 * 60 * 1000);

	return now.getTime() >= expiryTime.getTime();
};

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
		if (data?.fetchedAt && isExpired(data.fetchedAt)) {
			refetch();
		}
	}, [data, refetch]);

	return {
		data: data ?? null,
		isLoading,
		error,
	};
};