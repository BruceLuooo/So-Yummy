import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ProfileContext from '../../context/profileContext';
import { ProfileContextType } from '../../types/profileTypes';
import Cookies from 'js-cookie';
import { updateProfilePictureAPI } from '../../apis/user';

type Props = {
	updatePhotoModal: boolean;
	setUpdatePhotoModal: Function;
};

function UpdateProfilePhoto({ updatePhotoModal, setUpdatePhotoModal }: Props) {
	const { updateProfilePicture, profileInformation } = useContext(
		ProfileContext,
	) as ProfileContextType;

	const token = Cookies.get('token');

	const [file, setFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string>(profileInformation.avatar);

	const hiddenFileInput = useRef(null);

	const onClick = () => {
		// @ts-ignore
		hiddenFileInput.current!.click();
	};

	useEffect(() => {
		if (file) {
			setImageUrl(URL.createObjectURL(file));
		}
	}, [file]);

	const importPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			setFile(e.target.files[0]);
		}
	};

	const updatePicture = async () => {
		const data = new FormData();
		//need to create a check to make sure that file is not null
		let image = file;
		data.append('avatar', image!);

		try {
			updateProfilePictureAPI(data, token!).then(() => {
				updateProfilePicture(imageUrl);
				window.location.reload();
				setUpdatePhotoModal(false);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			show={updatePhotoModal}
			size='lg'
			onHide={() => setUpdatePhotoModal(false)}
		>
			<Modal.Header>
				<Modal.Title>Update profile picture</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container className='d-flex flex-column align-items-center gap-2'>
					<img
						src={imageUrl}
						alt='Profile Picture'
						className='upload-photo'
						draggable={false}
					/>
					<Button className='w-100' onClick={onClick}>
						+ Upload Photo
					</Button>
					<input
						style={{ display: 'none' }}
						type='file'
						ref={hiddenFileInput}
						onChange={importPhoto}
					/>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setUpdatePhotoModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={updatePicture}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateProfilePhoto;
