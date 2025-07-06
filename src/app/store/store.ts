import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import { InsightsAPI } from '../../entities/coin-stats/insights/api/InsightsAPI';

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(InsightsAPI.middleware),
});

// Экспорт типов для глобального состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export type AppThunk<ReturnType = void> = (
	dispatch: AppDispatch,
	getState: () => RootState
) => ReturnType;