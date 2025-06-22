import reactLogo from '../../shared/assets/svg/react.svg';
import viteLogo from '../../shared/assets/svg/vite.svg';
import reduxLogo from '../../shared/assets/svg/redux.svg';
import { useTranslation } from 'react-i18next';
import i18n from '../../app/configs/i18next/i18next';

const MainPage = () => {
	const { t } = useTranslation();

	const handleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};
    
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://redux-toolkit.js.org" target="_blank" rel="noreferrer">
					<img src={reduxLogo} className="logo redux" alt="Redux logo" />
				</a>
			</div>
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1>{t('Шаблон')} React</h1>
			<p className="read-the-docs">
				{t('Нажмите на логотипы Vita и React, чтобы узнать больше')}
			</p>
			<button onClick={handleLanguage}>{t('Короткий язык')}</button>
		</>
	);
};

export default MainPage;