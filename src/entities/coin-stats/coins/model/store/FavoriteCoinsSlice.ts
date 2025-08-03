// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinsState } from '../types/ICoinsState';

const initialState: ICoinsState = {
	coinIds: []
};

const FavoriteCoinsSlice = createSlice({
	name: 'favoriteCoinsSlice',
	initialState,
	reducers: {
		addFavoriteCoin: (state, action: PayloadAction<string>) => {
			const index = state.coinIds.findIndex(coinId => coinId === action.payload);

			if (index === -1) {
				state.coinIds.push(action.payload);
			} else {
				state.coinIds[index] = action.payload;
			}
		},
		deleteFavoriteCoin: (state, action: PayloadAction<string>) => {
			const index = state.coinIds.findIndex(coinId => coinId === action.payload);

			if (index !== -1) {
				state.coinIds.splice(index, 1);
			}
		},
		clearFavoriteCoins: (state) => {
			state.coinIds = [];
		}
	},
});

export const { addFavoriteCoin, deleteFavoriteCoin, clearFavoriteCoins } = FavoriteCoinsSlice.actions;
export default FavoriteCoinsSlice.reducer;