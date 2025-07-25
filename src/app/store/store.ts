import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import { InsightsAPI } from '../../entities/coin-stats/insights/api/InsightsAPI';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: [InsightsAPI.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // иначе redux-persist будет ругаться
		}).concat(InsightsAPI.middleware),
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