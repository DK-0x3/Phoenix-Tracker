import { setSessionData } from '../sessionSlice';
import { LocalStorageKey } from '../../../../shared/types/LocalStorageKey';
import { AppThunk } from '../../../../app/store/store';

export const updateLastActivity = (): AppThunk => (dispatch, getState) => {
	const state = getState().session;
	if (!state) return;

	const updated = { ...state, lastActivity: Date.now() };
	dispatch(setSessionData(updated));
	localStorage.setItem(LocalStorageKey.SESSION, JSON.stringify(updated));
};