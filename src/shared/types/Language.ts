export enum Language {
    RUSSIAN = 'RUSSIAN',
    ENGLISH = 'ENGLISH',
    CHINESE = 'CHINESE',
}

export const shortCodes: Record<Language, string> = {
	[Language.RUSSIAN]: 'RU',
	[Language.ENGLISH]: 'EN',
	[Language.CHINESE]: 'ZH',
};

export const i18nToEnumMap: Record<string, Language> = {
	ru: Language.RUSSIAN,
	en: Language.ENGLISH,
	zh: Language.CHINESE,
};