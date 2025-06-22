import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import Layout from '../Layout';
import MainPage from '../../pages/main/MainPage';
import NotFoundPage from '../../pages/not-found/NotFoundPage';

const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Layout/>}>
				<Route index element={<MainPage/>}/>
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
			</Route>
		</Routes>
	);
};

export default AppRouter;