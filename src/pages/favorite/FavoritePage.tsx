import styles from './FavoritePage.module.scss';
import { PanelWidgetsContainer } from '../../widgets/panel-widgets-container/ui/PanelWidgetsContainer';
import { MainInfinityHeader } from '../../widgets/mian-infinity-header/ui/MainInfinityHeader';
import { FavoriteInfinityScroll } from '../../widgets/favorite-infinity-scroll/ui/FavoriteInfinityScroll';

export const FavoritePage = () => {
	return (
		<div className={styles.FavoritePage}>
			<PanelWidgetsContainer />
			<MainInfinityHeader/>

			<div className={styles.FavoriteInfinityScrollWrapper}>
				<FavoriteInfinityScroll />
			</div>
		</div>
	);
};