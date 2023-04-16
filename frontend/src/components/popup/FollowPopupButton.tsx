import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { followProfileAPI, unfollowProfileAPI } from '../../apis/user';
import ProfileContext from '../../context/profileContext';
import { ProfileContextType } from '../../types/profileTypes';

type Props = {
	id: string;
};

function FollowPopupButton({ id }: Props) {
	const { addFollowing, removeFollowing } = useContext(
		ProfileContext,
	) as ProfileContextType;

	const [isFollowing, setIsFollowing] = useState<boolean>(true);
	const token = Cookies.get('token');

	const unfollowProfile = async () => {
		if (token === undefined) return;
		try {
			setIsFollowing(false);
			removeFollowing();
			unfollowProfileAPI(id, token);
		} catch (error) {
			console.log(error);
		}
	};

	const followProfile = async () => {
		if (token === undefined) return;
		try {
			setIsFollowing(true);
			addFollowing();
			followProfileAPI(id, token);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{isFollowing ? (
				<Button className='btn-secondary' onClick={unfollowProfile}>
					Unfollow
				</Button>
			) : (
				<Button onClick={followProfile}>+Follow</Button>
			)}
		</div>
	);
}

export default FollowPopupButton;
