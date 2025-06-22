import { ISessionState } from '../types/ISessionState';
import { setSessionData } from '../sessionSlice';
import { StorageKeyType } from '../../../../shared/types/LocalStorageKey';
import { AppThunk } from '../../../../app/store/store';

/**
 * Инициализирует сессию один раз при загрузке, если она отсутствует.
 */
export const initSession = (): AppThunk => (dispatch) => {
	const session = localStorage.getItem(StorageKeyType.SESSION);
	const now = Date.now();

	if (session) {
		try {
			const data: ISessionState = JSON.parse(session);

			if (data.sessionId) {
				console.log('найдена сохранённая сессия', data);
				const updatedSession = { ...data, lastActivity: now };
				dispatch(setSessionData(updatedSession));
				localStorage.setItem(StorageKeyType.SESSION, JSON.stringify(updatedSession));
				return;
			}
		} catch (e) {
			console.warn('Ошибка при чтении session из localStorage', e);
			localStorage.removeItem(StorageKeyType.SESSION);
		}
	}

	// Если сессия не найдена — создаём новую
	const newSessionId = `session-${now}`;
	const newSession: ISessionState = {
		sessionId: newSessionId,
		lastActivity: now,
	};

	dispatch(setSessionData(newSession));
	localStorage.setItem(StorageKeyType.SESSION, JSON.stringify(newSession));
	console.log('создана новая сессия', newSession);
};
