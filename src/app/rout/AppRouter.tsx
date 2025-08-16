import { Route, Routes } from 'react-router-dom';
import ROUTES, { ROUTES_PARAMS } from './routes';
import Layout from '../Layout';
import MainPage from '../../pages/main/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';
import { FavoritePage } from '../../pages/favorite/FavoritePage';
import { CoinPage } from '../../pages/coin/CoinPage';

const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Layout/>}>
				<Route index element={<MainPage/>}/>
				<Route path={ROUTES.FAVORITES} element={<FavoritePage/>}/>
				<Route path={`${ROUTES.COIN}/:${ROUTES_PARAMS.COIN.CoinId}`} element={<CoinPage/>}/>
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
			</Route>
		</Routes>
	);
};

export default AppRouter;