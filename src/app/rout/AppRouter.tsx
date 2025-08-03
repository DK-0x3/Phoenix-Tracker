import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import Layout from '../Layout';
import MainPage from '../../pages/main/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import { FavoritePage } from '../../pages/favorite/FavoritePage';

const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Layout/>}>
				<Route index element={<MainPage/>}/>
				<Route path={ROUTES.FAVORITES} element={<FavoritePage/>}/>
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
			</Route>
		</Routes>
	);
};

export default AppRouter;