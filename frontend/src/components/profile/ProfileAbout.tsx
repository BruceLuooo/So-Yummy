import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileContext from '../../context/profileContext';
import EditProfileButton from './EditProfileButton';
import FollowButton from './FollowButton';
import FollowCount from './FollowCount';
import { ProfileContextType } from '../../types/profileTypes';
import camera from '../../assets/camera.svg';
import UpdateProfilePhoto from '../popup/UpdateProfilePhoto';
import LoadingPlaceHolder from '../loading/LoadingPlaceHolder';
import { getUserInfo } from '../../apis/user';
import avatar from '../../assets/7.png';

function ProfileAbout() {
	const { addProfile, profileInformation } = useContext(
		ProfileContext,
	) as ProfileContextType;
	const [signedIn, setSignedIn] = useState<boolean>(false);
	const [updatePhotoModal, setUpdatePhotoModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		getUserInfo(id!).then(data => {
			addProfile(data);
			const token = Cookies.get('userId');

			if (token === undefined || JSON.parse(token!) !== id) {
				setSignedIn(false);
				setTimeout(() => {
					setLoading(false);
				}, 200);
			} else {
				setSignedIn(true);
				setTimeout(() => {
					setLoading(false);
				}, 200);
			}
		});
	}, [id]);

	return (
		<div className='profile-user-info'>
			<div className='profile-user-avatar'>
				<div className='profile-update-avatar'>
					{loading ? (
						<div>
							<LoadingPlaceHolder
								extraStyles={{
									height: '100%',
									top: '0',
									left: '0',
									borderRadius: '50%',
								}}
								container
							/>
							<img
								className='profile-user-avatar-image'
								src={avatar}
								alt='avatar'
							/>
						</div>
					) : (
						<img
							className='profile-user-avatar-image'
							src={profileInformation.avatar}
							alt='avatar'
							draggable={false}
						/>
					)}
					{signedIn && (
						<img
							className='profile-user-update-avatar-icon'
							src={camera}
							alt='uploadPhoto'
							draggable={false}
							onClick={() => setUpdatePhotoModal(true)}
						/>
					)}
				</div>
				<div style={{ position: 'relative' }}>
					{loading && (
						<LoadingPlaceHolder
							extraStyles={{ height: '100%', top: '0', left: '0' }}
							container
						/>
					)}
					{signedIn ? <EditProfileButton /> : <FollowButton />}
				</div>
			</div>
			<div>
				<div>
					<strong>{profileInformation.name}</strong>
				</div>
				<div>{profileInformation.title}</div>
			</div>
			<div>{profileInformation.bio}</div>
			<FollowCount />
			{updatePhotoModal && (
				<UpdateProfilePhoto
					setUpdatePhotoModal={setUpdatePhotoModal}
					updatePhotoModal={updatePhotoModal}
				/>
			)}
		</div>
	);
}

export default ProfileAbout;
