import { useAppDispatch } from '../../lib/hooks/useAppDispatch';
import { i18nToEnumMap, Language, shortCodes } from '../../types/Language';
import i18n from 'i18next';
import { useState } from 'react';
import { setSessionLanguage } from '../../../entities/session/model/sessionSlice';
import styles from './LangSwitcher.module.scss';

export const LangSwitcher = () => {
	const dispatch = useAppDispatch();
	const initialLang = i18nToEnumMap[i18n.language] ?? Language.RUSSIAN;
	const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLang);

	const languages = Object.values(Language);
	const otherLangs = languages.filter(lang => lang !== currentLanguage);

	const onChangeLanguage = async (lang: Language) => {
		setCurrentLanguage(lang);
		dispatch(setSessionLanguage(lang));
		// eslint-disable-next-line import/no-named-as-default-member
		await i18n.changeLanguage(shortCodes[lang].toLowerCase());
	};

	return (
		<div className={styles.LangSwitcher}>
			<div onClick={() => onChangeLanguage(currentLanguage)}>
				{shortCodes[currentLanguage]}
			</div>
			<div onClick={() => onChangeLanguage(otherLangs[0])}>
				{shortCodes[otherLangs[0]]}
			</div>
			<div onClick={() => onChangeLanguage(otherLangs[1])}>
				{shortCodes[otherLangs[1]]}
			</div>
		</div>
	);
};