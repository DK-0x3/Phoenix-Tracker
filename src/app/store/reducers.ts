import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from '../../entities/session/model/store/sessionSlice';
import { InsightsAPI } from '../../entities/coin-stats/insights/api/InsightsAPI';
import { CoinsStatsAPI } from '../../entities/coin-stats/coins/api/CoinsStatsAPI';
import { CoinsGeckoAPI } from '../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { GlobalGeckoAPI } from '../../entities/coin-gecko/global/api/GlobalGeckoAPI';
import favoriteCoinsSlice from '../../entities/coin-stats/coins/model/store/FavoriteCoinsSlice';

export const reducers = combineReducers({
	sessionSlice: sessionSlice,
	favoriteCoinsSlice: favoriteCoinsSlice,
	[InsightsAPI.reducerPath]: InsightsAPI.reducer,
	[CoinsStatsAPI.reducerPath]: CoinsStatsAPI.reducer,
	[CoinsGeckoAPI.reducerPath]: CoinsGeckoAPI.reducer,
	[GlobalGeckoAPI.reducerPath]: GlobalGeckoAPI.reducer,
});