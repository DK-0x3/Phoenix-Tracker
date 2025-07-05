import { RootState } from '../../../app/store/store';

export const getSessionId = (state: RootState) => state.session.sessionId;

export const getSessionLanguage = (state: RootState) => state.session.language;

export const getSessionObject = (state: RootState) => state.session;