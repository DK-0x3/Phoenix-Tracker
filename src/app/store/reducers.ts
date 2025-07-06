import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from '../../entities/session/model/sessionSlice';
import { InsightsAPI } from '../../entities/coin-stats/insights/api/InsightsAPI';

export const reducers = combineReducers({
	session: sessionSlice,
	[InsightsAPI.reducerPath]: InsightsAPI.reducer,
});