import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function NavbarPopup() {
	const navigate = useNavigate();

	const token = Cookies.get('token');

	const goToProfile = () => {
		const id = Cookies.get('userId');
		const parseId = JSON.parse(id!);
		// setPostInformation({ data: [], hasMore: true });
		navigate(`/profile/${parseId}`);
	};

	const logout = () => {
		Cookies.remove('token');
		Cookies.remove('userId');

		navigate('/');
		window.location.reload();
	};

	const demoLogin = async () => {
		const response = await axios.post(
			`${process.env.REACT_APP_LOCALHOST_URL}/api/users/userSession`,
			{ email: 'bruceluo@gmail.com', password: 'bruceluo' },
		);

		Cookies.set('token', JSON.stringify(response.data.token), {
			expires: 1,
		});
		Cookies.set('userId', JSON.stringify(response.data.userId), {
			expires: 1,
		});
		navigate(`/profile/${response.data.userId}`);
	};

	return (
		<div>
			{token ? (
				<div className='navbar-popup'>
					<div>
						<button onClick={goToProfile} className='button-style'>
							Profile
						</button>
					</div>
					<div>
						<button onClick={() => navigate('/recipe-calender')}>
							Calender
						</button>
					</div>
					<div>
						<button onClick={logout} className='button-style'>
							Logout
						</button>
					</div>
				</div>
			) : (
				<div className='navbar-popup'>
					<div>
						<button onClick={() => navigate('/login')} className='button-style'>
							Login
						</button>
					</div>
					<div>
						<button onClick={demoLogin} className='button-style'>
							Demo Login
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default NavbarPopup;
