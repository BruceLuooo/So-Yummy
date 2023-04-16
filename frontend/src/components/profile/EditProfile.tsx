import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ProfileContext from '../../context/profileContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { ProfileContextType, UserData } from '../../types/profileTypes';
import { updateProfileAPI } from '../../apis/user';

type Props = {
	openProfileModal: boolean;
	setOpenProfileModal: Function;
};

function EditProfile({ openProfileModal, setOpenProfileModal }: Props) {
	const { profileInformation, updateProfileInformation } = useContext(
		ProfileContext,
	) as ProfileContextType;
	const { id } = useParams();
	const token = Cookies.get('token');

	const [editProfile, setEditProfile] = useState<UserData>({
		name: profileInformation.name,
		title: profileInformation.title,
		bio: profileInformation.bio,
		email: profileInformation.email,
		password: '',
		avatar: '',
	});
	const [error, setError] = useState({ active: false, message: '' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditProfile({
			...editProfile,
			[e.target.id]: e.target.value,
		});
	};

	const updateProfile = async () => {
		try {
			if (token !== undefined && id !== undefined) {
				updateProfileAPI(id, editProfile, token);
				updateProfileInformation(editProfile);
				setEditProfile(prev => ({
					...prev,
					password: '',
				}));
				setOpenProfileModal(false);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError({ active: true, message: error.response!.data });
			}
		}
	};

	return (
		<Modal
			show={openProfileModal}
			size='lg'
			onHide={() => setOpenProfileModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Edit Profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form>
						<Form.Label className='mb-0 ms-2'>Name</Form.Label>
						<Form.Control
							className='mb-3'
							type='text'
							onChange={handleChange}
							id='name'
							value={editProfile.name}
							placeholder='Name'
						/>
						<Form.Label className='mb-0 ms-2'>Title</Form.Label>
						<Form.Control
							className='mb-3'
							type='text'
							onChange={handleChange}
							id='title'
							value={editProfile.title}
							placeholder='Title'
						/>
						<Form.Label className='mb-0 ms-2'>Bio</Form.Label>
						<Form.Control
							className='mb-3'
							as='textarea'
							rows={3}
							id='bio'
							value={editProfile.bio}
							placeholder='Bio'
							onChange={handleChange}
						/>
						<Form.Label className='mb-0 ms-2'>Email</Form.Label>
						<Form.Control
							className='mb-3'
							type='text'
							onChange={handleChange}
							id='email'
							value={editProfile.email}
							placeholder='Email'
						/>
						<Form.Label className='mb-0 ms-2'>Password</Form.Label>
						<Form.Control
							className='mb-3'
							type='password'
							onChange={handleChange}
							id='password'
							value={editProfile.password}
							placeholder='Password'
						/>
					</Form>
					{error.active && (
						<div className='ps-2 text-danger'>{error.message}</div>
					)}
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setOpenProfileModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={updateProfile}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditProfile;
