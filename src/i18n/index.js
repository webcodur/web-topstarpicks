import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import koTranslations from './locales/ko.json';

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslations,
		},
		ko: {
			translation: koTranslations,
		},
	},
	lng: 'ko', // 기본 언어 설정
	fallbackLng: 'en',
	supportedLngs: ['en', 'ko'], // 지원하는 언어 목록을 명시적으로 정의
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
