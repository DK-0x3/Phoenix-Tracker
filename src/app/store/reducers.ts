import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from '../../entities/session/model/store/sessionSlice';
import { InsightsAPI } from '../../entities/coin-stats/insights/api/InsightsAPI';
import { CoinsStatsAPI } from '../../entities/coin-stats/coins/api/CoinsStatsAPI';
import coinsSlice from '../../entities/coin-stats/coins/model/store/coinsSlice';
import { CoinsGeckoAPI } from '../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { GlobalGeckoAPI } from '../../entities/coin-gecko/global/api/GlobalGeckoAPI';

export const reducers = combineReducers({
	sessionSlice: sessionSlice,
	coinsSlice: coinsSlice,
	[InsightsAPI.reducerPath]: InsightsAPI.reducer,
	[CoinsStatsAPI.reducerPath]: CoinsStatsAPI.reducer,
	[CoinsGeckoAPI.reducerPath]: CoinsGeckoAPI.reducer,
	[GlobalGeckoAPI.reducerPath]: GlobalGeckoAPI.reducer,
});