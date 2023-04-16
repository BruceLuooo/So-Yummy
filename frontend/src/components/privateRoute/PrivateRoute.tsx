import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

function PrivateRoute() {
	const token = Cookies.get('token');

	if (!token) {
		return <Outlet />;
	} else {
		return <Navigate to='/' />;
	}
}

export default PrivateRoute;
