import { RootState } from '../../../../../app/store/store';

export const getFavoriteCoins = (state: RootState) => state.favoriteCoinsSlice.coinIds;

export const getFavoriteCoinById = (id: string) => (state: RootState) =>
	state.favoriteCoinsSlice.coinIds.find(coin => coin === id);