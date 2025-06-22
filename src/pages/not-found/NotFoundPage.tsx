import { useTranslation } from 'react-i18next';
import ROUTES from '../../app/rout/routes';

const NotFoundPage = () => {
	const { t } = useTranslation();
    
	return (
		<div>
			<h1>{t('Ошибка, страница не найдена')}</h1>
			<a href={ROUTES.HOME}>{t('На главную')}</a>
		</div>
	);
};

export default NotFoundPage;