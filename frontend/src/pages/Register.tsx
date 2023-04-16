import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

interface Register {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

function Register() {
	const navigate = useNavigate();
	const [registerInfo, setRegisterInfo] = useState<Register>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState({ active: false, message: '' });

	const updateLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterInfo({
			...registerInfo,
			[e.target.id]: e.target.value,
		});
	};

	const register = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_LOCALHOST_URL}/api/users/`,
				registerInfo,
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
			<h1>Sign Up</h1>
			<span>Connect and share your recipes</span>
			<Form>
				<Form.Control
					className='mb-3'
					type='text'
					onChange={updateLoginInfo}
					id='name'
					value={registerInfo.name}
					placeholder='Name'
				/>
				<Form.Control
					className='mb-3'
					type='text'
					onChange={updateLoginInfo}
					id='email'
					value={registerInfo.email}
					placeholder='Email'
				/>

				<Form.Control
					className='mb-3'
					type='password'
					onChange={updateLoginInfo}
					id='password'
					value={registerInfo.password}
					placeholder='Password'
				/>
				<Form.Control
					className='mb-3'
					type='password'
					onChange={updateLoginInfo}
					id='confirmPassword'
					value={registerInfo.confirmPassword}
					placeholder='Confirm Password'
				/>
			</Form>
			{error && <div className='text-danger mb-1'>{error.message}</div>}
			<Button onClick={register}>Register</Button>
			<div className='line-seperator'>
				<span>or</span>
			</div>
			<Button variant='secondary' onClick={() => navigate('/login')}>
				Login
			</Button>
		</div>
	);
}

export default Register;
