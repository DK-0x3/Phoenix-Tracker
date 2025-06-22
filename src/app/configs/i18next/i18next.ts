import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// eslint-disable-next-line import/no-named-as-default-member
i18n
	.use(HttpBackend) // Для загрузки переводов через HTTP
	.use(LanguageDetector) // Для определения языка браузера
	.use(initReactI18next) // Для интеграции с React
	.init({
		fallbackLng: 'ru', // Язык по умолчанию
		supportedLngs: ['en', 'ru'], // Поддерживаемые языки
		debug: true, // Для отладки
		interpolation: {
			escapeValue: false, // Отключение экранирования
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь к файлам с переводами
		},
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigator'],
			caches: ['localStorage', 'cookie'],
		},
	});

export default i18n;
