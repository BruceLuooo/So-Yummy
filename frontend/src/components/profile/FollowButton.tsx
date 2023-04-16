import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import {
	checkIsFollowing,
	followProfileAPI,
	unfollowProfileAPI,
} from '../../apis/user';
import ProfileContext from '../../context/profileContext';
import { ProfileContextType } from '../../types/profileTypes';
import LoginPopup from '../popup/LoginPopup';

function FollowButton() {
	const { addFollower, removeFollower } = useContext(
		ProfileContext,
	) as ProfileContextType;

	const [isFollowing, setIsFollowing] = useState<boolean>(false);
	const [loginPopup, setLoginPopup] = useState(false);
	const { id } = useParams();
	const token = Cookies.get('token');

	useEffect(() => {
		if (id !== undefined && token !== undefined) {
			checkIsFollowing(id, token).then(data => {
				if (data.status === true) {
					return setIsFollowing(true);
				} else {
					return setIsFollowing(false);
				}
			});
		}
	}, [id]);

	const unfollowProfile = async () => {
		if (token === undefined) return;
		try {
			setIsFollowing(false);
			removeFollower();
			unfollowProfileAPI(id!, token);
		} catch (error) {
			console.log(error);
		}
	};

	const followProfile = async () => {
		if (token === undefined) return setLoginPopup(true);
		try {
			setIsFollowing(true);
			addFollower();
			followProfileAPI(id!, token);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{isFollowing ? (
				<Button onClick={unfollowProfile}>Unfollow</Button>
			) : (
				<Button onClick={followProfile}>+Follow</Button>
			)}
			{loginPopup && (
				<LoginPopup loginModal={loginPopup} setLoginModal={setLoginPopup} />
			)}
		</div>
	);
}

export default FollowButton;
