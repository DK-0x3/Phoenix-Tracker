import { ISessionState } from '../types/ISessionState';
import { setSessionData } from '../sessionSlice';
import { LocalStorageKey } from '../../../../shared/types/LocalStorageKey';
import { AppThunk } from '../../../../app/store/store';
import { Language } from '../../../../shared/types/Language';

/**
 * Инициализирует сессию один раз при загрузке, если она отсутствует.
 */
export const initSession = (): AppThunk => (dispatch) => {
	const session = localStorage.getItem(LocalStorageKey.SESSION);
	const now = Date.now();

	if (session) {
		try {
			const data: ISessionState = JSON.parse(session);

			if (data.sessionId) {
				console.log('найдена сохранённая сессия', data);
				const updatedSession = { ...data, lastActivity: now };
				dispatch(setSessionData(updatedSession));
				localStorage.setItem(LocalStorageKey.SESSION, JSON.stringify(updatedSession));
				return;
			}
		} catch (e) {
			console.warn('Ошибка при чтении session из localStorage', e);
			localStorage.removeItem(LocalStorageKey.SESSION);
		}
	}

	// Если сессия не найдена — создаём новую
	const newSessionId = `session-${now}`;
	const newSession: ISessionState = {
		sessionId: newSessionId,
		lastActivity: now,
		language: Language.RUSSIAN,
	};

	dispatch(setSessionData(newSession));
	localStorage.setItem(LocalStorageKey.SESSION, JSON.stringify(newSession));
	console.log('создана новая сессия', newSession);
};
