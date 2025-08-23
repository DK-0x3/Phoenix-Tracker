import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import { InsightsCoinStatsAPI } from '../../entities/coin-stats/insights/api/InsightsCoinStatsAPI';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CoinsStatsAPI } from '../../entities/coin-stats/coins/api/CoinsStatsAPI';
import { CoinsGeckoAPI } from '../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { GlobalGeckoAPI } from '../../entities/coin-gecko/global/api/GlobalGeckoAPI';
import { CbrAPI } from '../../entities/cbr/api/CbrAPI';
import { FiatsStatsAPI } from '../../entities/coin-stats/fiats/api/FiatsStatsAPI';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: [
		InsightsCoinStatsAPI.reducerPath,
		CoinsStatsAPI.reducerPath,
		CoinsGeckoAPI.reducerPath,
		CbrAPI.reducerPath,
		GlobalGeckoAPI.reducerPath,
		FiatsStatsAPI.reducerPath,
		'favoriteCoinsSlice',
	],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // иначе redux-persist будет ругаться
		}).concat(
			InsightsCoinStatsAPI.middleware,
			CoinsStatsAPI.middleware,
			CoinsGeckoAPI.middleware,
			CbrAPI.middleware,
			GlobalGeckoAPI.middleware,
			FiatsStatsAPI.middleware,
		),
});

export const persistor = persistStore(store);

// Экспорт типов для глобального состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export type AppThunk<ReturnType = void> = (
	dispatch: AppDispatch,
	getState: () => RootState
) => ReturnType;