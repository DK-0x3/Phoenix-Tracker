import { RootState } from '../../../../app/store/store';

export const getSessionId = (state: RootState) => state.sessionSlice.sessionId;

export const getSessionLanguage = (state: RootState) => state.sessionSlice.language;

export const getSessionObject = (state: RootState) => state.sessionSlice;