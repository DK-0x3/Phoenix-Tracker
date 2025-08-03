import styles from './MainInfinityHeader.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../../app/rout/routes';

export const MainInfinityHeader = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.MainInfinityHeader}>
			<div className={styles.NavHeader}>
				<NavLink
					to={ROUTES.HOME}
					className={({ isActive }) =>
						isActive ? styles.Active : ''
					}
				>
					{t('Все')}
				</NavLink>

				<NavLink
					to={ROUTES.FAVORITES}
					className={({ isActive }) =>
						isActive ? styles.Active : ''
					}
				>
					{t('Избранное')}
				</NavLink>
			</div>

			<div className={styles.Separator}>

			</div>

			<div className={styles.InfinityScrollHeader}>
				<span>#</span>
				<span>{t('Лого')}</span>
				<span>{t('Название')}</span>
				<span>{t('Цена')}</span>
				<span>{t('1ч %')}</span>
				<span>{t('24ч %')}</span>
				<span>{t('7д %')}</span>
				<span>{t('Рын. Кап.')}</span>
				<span>{t('Объем 24ч')}</span>
				<span>{t('Оборот')}</span>
			</div>
		</div>
	);
};