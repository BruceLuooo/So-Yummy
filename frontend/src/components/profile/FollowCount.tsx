import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileContext from '../../context/profileContext';
import FollowPopup from '../popup/FollowPopup';
import { ProfileContextType } from '../../types/profileTypes';
import { getFollowersAPI, getFollowingAPI } from '../../apis/user';

function FollowCount() {
	const { profileInformation } = useContext(
		ProfileContext,
	) as ProfileContextType;

	const { id } = useParams();

	const [follow, setFollow] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [title, setTitle] = useState('');

	const getFollowers = async () => {
		await getFollowersAPI(id!).then(data => {
			setFollow(data.follower);
		});
		setTitle('Followers');
		setOpenModal(true);
	};

	const getFollowing = async () => {
		await getFollowingAPI(id!).then(data => {
			setFollow(data.following);
		});
		setTitle('Following');
		setOpenModal(true);
	};

	return (
		<div className='profile-following'>
			<button className='border-0 bg-white ps-0' onClick={getFollowers}>
				<strong>{profileInformation.followers}</strong> Followers
			</button>
			<button className='border-0 bg-white ms-1' onClick={getFollowing}>
				{' '}
				<strong>{profileInformation.following}</strong> Following
			</button>
			{openModal && (
				<FollowPopup
					openModal={openModal}
					setOpenModal={setOpenModal}
					follow={follow}
					title={title}
				/>
			)}
		</div>
	);
}

export default FollowCount;
