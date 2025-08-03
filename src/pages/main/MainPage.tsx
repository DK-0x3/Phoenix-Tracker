import { PanelWidgetsContainer } from '../../widgets/panel-widgets-container/ui/PanelWidgetsContainer';
import styles from './MainPage.module.scss';
import { MainInfinityScroll } from '../../widgets/main-infinity-scroll/ui/MainInfinityScroll';
import { MainInfinityHeader } from '../../widgets/mian-infinity-header/ui/MainInfinityHeader';

const MainPage = () => {
	return (
		<div className={styles.MainPage}>
			<PanelWidgetsContainer />
			<MainInfinityHeader/>

			<div className={styles.MainInfinityScrollWrapper}>
				<MainInfinityScroll />
			</div>
		</div>
	);
};

export default MainPage;