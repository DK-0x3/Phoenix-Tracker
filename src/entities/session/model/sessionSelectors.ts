import { RootState } from '../../../app/store/store';

export const getSessionId = (state: RootState) => state.session.sessionId;

export const getSessionObject = (state: RootState) => state.session;