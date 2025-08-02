import { RootState } from '../../../../../app/store/store';

export const getSessionId = (state: RootState) => state.coinsSlice.coins;

export const getCoinById = (id: string) => (state: RootState) =>
	state.coinsSlice.coins.find(coin => coin.id === id);