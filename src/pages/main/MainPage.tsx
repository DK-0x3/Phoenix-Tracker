import { useTranslation } from 'react-i18next';
import { PanelWidgetsContainer } from '../../widgets/panel-widgets-container/ui/PanelWidgetsContainer';

const MainPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<PanelWidgetsContainer />
		</>
	);
};

export default MainPage;