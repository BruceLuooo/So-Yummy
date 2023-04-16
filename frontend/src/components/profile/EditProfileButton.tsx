import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import EditProfile from './EditProfile';

function EditProfileButton() {
	const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);

	return (
		<div>
			<Button onClick={() => setOpenProfileModal(true)}>Edit Profile</Button>
			{openProfileModal && (
				<EditProfile
					openProfileModal={openProfileModal}
					setOpenProfileModal={setOpenProfileModal}
				/>
			)}
		</div>
	);
}

export default EditProfileButton;
