import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import {useContext} from 'react';
import {Context} from '../index';

const AppRouter = () => {
	const {user} = useContext(Context);
	console.log('user: ', user);
	return (
		<div>
			<Routes>
				{user.isAuth === true &&
					authRoutes.map(({path, Component}) => (
						<Route key={path} path={path} element={<Component />} />
					))}
				{publicRoutes.map(({path, Component}) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
};

export default AppRouter;
