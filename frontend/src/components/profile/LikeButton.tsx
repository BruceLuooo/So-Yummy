import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { didUserLikeAPI, likePostAPI, unlikePostAPI } from '../../apis/Posts';
import PostContext from '../../context/postContext';
import { AddLike, RemoveLike } from '../../hooks/useAddOrRemoveLike';
import { PostContextType } from '../../types/postTypes';
import LoginPopup from '../popup/LoginPopup';

type Props = {
	postId: string;
};

function LikeButton({ postId }: Props) {
	const { setPostInformation, postInformation } = useContext(
		PostContext,
	) as PostContextType;

	const [like, setLike] = useState(false);
	const [loginPopup, setLoginPopup] = useState(false);
	const token = Cookies.get('token');

	useEffect(() => {
		const userId = Cookies.get('userId');
		if (userId === undefined) return setLike(false);

		setLike(false);
		didUserLikeAPI(postId, token!).then(data => {
			if (data.status === true) {
				return setLike(true);
			} else {
				return;
			}
		});
	}, [postId]);

	const likePost = async () => {
		if (token === undefined) {
			setLoginPopup(true);
		} else {
			likePostAPI(postId, token!);

			const data = AddLike(postInformation.data, postId);

			if (data !== -1) {
				setPostInformation(prev => ({
					...prev,
					data,
				}));
			}

			setLike(true);
		}
	};
	const unlikePost = async () => {
		unlikePostAPI(postId, token!);

		const data = RemoveLike(postInformation.data, postId);

		if (data !== -1) {
			setPostInformation(prev => ({
				...prev,
				data,
			}));
		}
		setLike(false);
	};

	return (
		<div className='w-100 interaction-button'>
			{like ? (
				<Button
					className='w-100 border border-0 rounded-1 text-unique bg-transparent hover-overlay '
					onClick={unlikePost}
				>
					Like
				</Button>
			) : (
				<Button
					className='w-100 border border-0 rounded-1 bg-transparent text-dark hover-overlay'
					onClick={likePost}
				>
					Like
				</Button>
			)}
			{loginPopup && (
				<LoginPopup loginModal={loginPopup} setLoginModal={setLoginPopup} />
			)}
		</div>
	);
}

export default LikeButton;
