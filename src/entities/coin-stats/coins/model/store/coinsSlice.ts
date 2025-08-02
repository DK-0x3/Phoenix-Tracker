// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinRefresh, ICoinsState } from '../types/ICoinsState';

const initialState: ICoinsState = {
	coinsSlice: []
};

const coinsSlice = createSlice({
	name: 'coinsSlice',
	initialState,
	reducers: {
		addCoin: (state, action: PayloadAction<ICoinRefresh>) => {
			const index = state.coins.findIndex(coin => coin.id === action.payload.id);

			if (index === -1) {
				state.coins.push(action.payload);
			} else {
				state.coins[index] = action.payload;
			}
		},
		deleteCoin: (state, action: PayloadAction<string>) => {
			const index = state.coins.findIndex(coin => coin.id === action.payload);

			if (index !== -1) {
				state.coins.splice(index, 1);
			}
		},
		updateCoin: (state, action: PayloadAction<ICoinRefresh>) => {
			const index = state.coins.findIndex(coin => coin.id === action.payload.id);

			if (index === -1) {
				state.coins.push(action.payload);
			} else {
				state.coins[index] = action.payload;
			}
		},
		clearCoins: (state) => {
			state.coins = [];
		}
	},
});

export const { addCoin, deleteCoin, updateCoin, clearCoins } = coinsSlice.actions;
export default coinsSlice.reducer;