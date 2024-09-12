import i18n from './index';

const supportedLanguages = ['en', 'ko'];

export const changeLanguage = (lang, setLanguageAtom) => {
	if (supportedLanguages.includes(lang)) {
		i18n.changeLanguage(lang);
		setLanguageAtom(lang);
	} else {
		console.error(`Unsupported language code: ${lang}`);
	}
};

export const useLanguage = (language, setLanguage) => {
	const handleLanguageChange = (newLang) => {
		changeLanguage(newLang, setLanguage);
	};

	return { language, handleLanguageChange };
};
