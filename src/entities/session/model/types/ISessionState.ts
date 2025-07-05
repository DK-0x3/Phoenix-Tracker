import { Language } from '../../../../shared/types/Language';

export interface ISessionState {
    sessionId: string | null;
    lastActivity: number | null;
    language: Language;
}