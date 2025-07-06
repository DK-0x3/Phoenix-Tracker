import { useEffect, useState } from 'react';
import { IResponseFearAndGreed } from '../../../entities/coin-stats/insights/model/IResponseFearAndGreed';
import { LocalStorageKey } from '../../types/LocalStorageKey';
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

export const useFearAndGreedData = (): IUseFearAndGreedData => {
	const [cachedData, setCachedData] = useState<IResponseFearAndGreed | null>(null);
	const todayUTC = new Date().toISOString().slice(0, 10);
	const lastFetchDate = localStorage.getItem(LocalStorageKey.FEAR_AND_GREED_LAST_UPDATE);
	const shouldSkip = lastFetchDate === todayUTC;

	const { data, isLoading, error } = useFetchFearAndGreedQuery(undefined, { skip: shouldSkip });

	// Когда получили свежие данные — сохранить в кэш
	useEffect(() => {
		if (data) {
			localStorage.setItem(LocalStorageKey.FEAR_AND_GREED_OBJECT, JSON.stringify(data));
			localStorage.setItem(LocalStorageKey.FEAR_AND_GREED_LAST_UPDATE, todayUTC);
		}
	}, [data, todayUTC]);

	// Если skip=true и нет свежих данных — взять из кэша
	useEffect(() => {
		if (!shouldSkip || data) return;
		const raw = localStorage.getItem(LocalStorageKey.FEAR_AND_GREED_OBJECT);
		if (raw) {
			try {
				const parsed = JSON.parse(raw);
				setCachedData(parsed);
			} catch (e) {
				console.error('Ошибка парсинга кэша:', e);
			}
		}
	}, [shouldSkip, data]);

	const resultData = data ?? cachedData;

	return { data: resultData, isLoading: isLoading, error: error };
};