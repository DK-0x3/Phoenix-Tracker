import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import { InsightsAPI } from '../../entities/coin-stats/insights/api/InsightsAPI';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CoinsStatsAPI } from '../../entities/coin-stats/coins/api/CoinsStatsAPI';
import { CoinsGeckoAPI } from '../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { GlobalGeckoAPI } from '../../entities/coin-gecko/global/api/GlobalGeckoAPI';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: [
		InsightsAPI.reducerPath,
		CoinsStatsAPI.reducerPath,
		CoinsGeckoAPI.reducerPath,
		GlobalGeckoAPI.reducerPath,
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
			InsightsAPI.middleware,
			CoinsStatsAPI.middleware,
			CoinsGeckoAPI.middleware,
			GlobalGeckoAPI.middleware
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