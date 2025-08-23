import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from '../../entities/session/model/store/sessionSlice';
import { InsightsCoinStatsAPI } from '../../entities/coin-stats/insights/api/InsightsCoinStatsAPI';
import { CoinsStatsAPI } from '../../entities/coin-stats/coins/api/CoinsStatsAPI';
import { CoinsGeckoAPI } from '../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { GlobalGeckoAPI } from '../../entities/coin-gecko/global/api/GlobalGeckoAPI';
import favoriteCoinsSlice from '../../entities/coin-stats/coins/model/store/FavoriteCoinsSlice';
import { CbrAPI } from '../../entities/cbr/api/CbrAPI';
import { FiatsStatsAPI } from '../../entities/coin-stats/fiats/api/FiatsStatsAPI';

export const reducers = combineReducers({
	sessionSlice: sessionSlice,
	favoriteCoinsSlice: favoriteCoinsSlice,
	[InsightsCoinStatsAPI.reducerPath]: InsightsCoinStatsAPI.reducer,
	[CoinsStatsAPI.reducerPath]: CoinsStatsAPI.reducer,
	[CoinsGeckoAPI.reducerPath]: CoinsGeckoAPI.reducer,
	[GlobalGeckoAPI.reducerPath]: GlobalGeckoAPI.reducer,
	[CbrAPI.reducerPath]: CbrAPI.reducer,
	[FiatsStatsAPI.reducerPath]: FiatsStatsAPI.reducer,
});