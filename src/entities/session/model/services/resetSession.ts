import { clearSessionData } from '../sessionSlice';
import { StorageKeyType } from '../../../../shared/types/LocalStorageKey';
import { AppThunk } from '../../../../app/store/store';

export const resetSession = (): AppThunk => (dispatch) => {
	dispatch(clearSessionData());
	localStorage.removeItem(StorageKeyType.SESSION);
};