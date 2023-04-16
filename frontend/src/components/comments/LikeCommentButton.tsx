import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {
	didUserLikeCommentAPI,
	likeCommentAPI,
	unlikeCommentAPI,
} from '../../apis/comments';
import { AddLike, RemoveLike } from '../../hooks/useAddOrRemoveLike';
import { CommentsData } from '../../types/commentTypes';
import LoginPopup from '../popup/LoginPopup';

type Props = {
	commentId: string;
	comments: CommentsData[];
	setComments: Function;
};

function LikeCommentButton({ commentId, comments, setComments }: Props) {
	const [like, setLike] = useState(false);
	const [loginPopup, setLoginPopup] = useState(false);
	const token = Cookies.get('token');
	const userId = Cookies.get('userId');

	useEffect(() => {
		if (userId === undefined) return setLike(false);

		if (token !== undefined) {
			setLike(false);
			didUserLikeCommentAPI(commentId, token).then(data => {
				if (data.status === true) {
					setLike(true);
				} else {
					setLike(false);
				}
			});
		}
	}, [commentId]);

	const likeComment = async () => {
		if (token !== undefined) {
			likeCommentAPI(commentId, token);
			const data = AddLike(comments, commentId);

			if (data !== -1) {
				setComments(data);
				setLike(true);
			}
		} else {
			setLoginPopup(true);
		}
	};
	const unlikeComment = async () => {
		if (token !== undefined) {
			unlikeCommentAPI(commentId, token);
		}

		const data = RemoveLike(comments, commentId);

		if (data !== -1) {
			setComments(data);
			setLike(false);
		}
	};

	return (
		<div>
			{like ? (
				<button
					className='d-flex ms-0 w-30 border-0 bg-white text-unique'
					onClick={unlikeComment}
				>
					Like
				</button>
			) : (
				<button
					className='d-flex ms-0 w-30 border-0 bg-white text-dark'
					onClick={likeComment}
				>
					Like
				</button>
			)}
			{loginPopup && (
				<LoginPopup loginModal={loginPopup} setLoginModal={setLoginPopup} />
			)}
		</div>
	);
}

export default LikeCommentButton;
