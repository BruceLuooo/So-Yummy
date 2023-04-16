import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginInformation {
	email: string;
	password: string;
}

function Login() {
	const navigate = useNavigate();
	const [loginInfo, setLoginInfo] = useState<LoginInformation>({
		email: '',
		password: '',
	});
	const [error, setError] = useState({ active: false, message: '' });

	const updateLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInfo({
			...loginInfo,
			[e.target.id]: e.target.value,
		});
	};

	const login = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LOCALHOST_URL}/api/users/userSession`,
				loginInfo,
			);

			Cookies.set('token', JSON.stringify(response.data.token), {
				expires: 1,
			});
			Cookies.set('userId', JSON.stringify(response.data.userId), {
				expires: 1,
			});
			navigate('/');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError({ active: true, message: `${error.response!.data}` });
			}
		}
	};

	return (
		<div className='login-register-container'>
			<h1>Sign In</h1>
			<span>Connect and share your recipes</span>
			<Form>
				<Form.Control
					className='mb-3'
					type='text'
					onChange={updateLoginInfo}
					id='email'
					value={loginInfo.email}
					placeholder='Email'
				/>

				<Form.Control
					className='mb-2'
					type='password'
					onChange={updateLoginInfo}
					id='password'
					value={loginInfo.password}
					placeholder='Password'
				/>
			</Form>
			{error && <div className='text-danger mb-1'>{error.message}</div>}
			<Button onClick={login}>Login</Button>
			<div className='line-seperator'>
				<span>or</span>
			</div>
			<Button variant='secondary' onClick={() => navigate('/register')}>
				Sign Up
			</Button>
		</div>
	);
}

export default Login;
