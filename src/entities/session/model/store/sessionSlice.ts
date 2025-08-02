// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISessionState } from '../types/ISessionState';
import { Language } from '../../../../shared/types/Language';

const initialState: ISessionState = {
	sessionId: null,
	lastActivity: Date.now(),
	language: Language.RUSSIAN,
};

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSessionData: (state, action: PayloadAction<ISessionState>) => {
			state.sessionId = action.payload.sessionId;
			state.lastActivity = action.payload.lastActivity;
		},
		clearSessionData: (state) => {
			state.sessionId = null;
			state.lastActivity = null;
		},
		setSessionLastActivity: (state, action: PayloadAction<number>) => {
			state.lastActivity = action.payload;
		},
		setSessionLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload;
		}
	},
});

export const { setSessionData, clearSessionData, setSessionLastActivity, setSessionLanguage } = sessionSlice.actions;
export default sessionSlice.reducer;