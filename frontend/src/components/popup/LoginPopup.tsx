import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Login {
	email: string;
	password: string;
}

type Props = {
	loginModal: boolean;
	setLoginModal: Function;
};

function LoginPopup({ loginModal, setLoginModal }: Props) {
	const navigate = useNavigate();
	const [loginInfo, setLoginInfo] = useState<Login>({
		email: '',
		password: '',
	});
	const [error, setError] = useState({ active: false, message: '' });

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
			setLoginModal(false);
			navigate(`/profile/${response.data.userId}`);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError({ active: true, message: `${error.response!.data}` });
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInfo({
			...loginInfo,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<Modal
			show={loginModal}
			animation={false}
			onHide={() => setLoginModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>You must login first</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form>
						<Form.Control
							className='mb-3'
							type='text'
							onChange={handleChange}
							id='email'
							value={loginInfo.email}
							placeholder='Email'
						/>

						<Form.Control
							className='mb-3'
							type='password'
							onChange={handleChange}
							id='password'
							value={loginInfo.password}
							placeholder='Password'
						/>
					</Form>
					{error && <div className='text-danger mb-1'>{error.message}</div>}
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => navigate('/register')}>
					Create Account
				</Button>
				<Button variant='primary' onClick={login}>
					Login
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LoginPopup;
