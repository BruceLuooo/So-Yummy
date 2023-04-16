import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import thumbsUp from '../../assets/thumbsUp.svg';
import { formatDistanceToNowStrict } from 'date-fns';
import LikeCommentPopup from '../popup/LikeCommentPopup';
import LikeCommentButton from './LikeCommentButton';
import { CommentsData } from '../../types/commentTypes';
import { getCommentLikesAPI } from '../../apis/comments';
import { LikedBy } from '../../types/likeTypes';

type Props = {
	comment: CommentsData;
	comments: CommentsData[];
	setComments: Function;
};

function Comments({ comment, comments, setComments }: Props) {
	const navigate = useNavigate();

	const [likeModal, setLikeModal] = useState(false);
	const [commentLikes, setCommentLikes] = useState<LikedBy[]>([]);

	const goToProfile = (userId: string) => {
		navigate(`/profile/${userId}`);
	};

	const getCommentLikes = async () => {
		getCommentLikesAPI(comment._id).then(data => {
			setCommentLikes(data.likes);
			setLikeModal(true);
		});
	};

	return (
		<div className='user-comment-container'>
			<div className='user-comment'>
				<div>
					<img
						src={comment.author.avatar}
						alt='avatar'
						className='comment-image'
						draggable={false}
					/>
				</div>
				<div className='user'>
					<div className='user user-info'>
						<button
							className='fw-bold d-flex border-0 bg-transparent ps-0 w-75'
							onClick={() => goToProfile(comment.author._id)}
						>
							{comment.author.name}
						</button>
						<span>{comment.comment}</span>
					</div>
					<div className='user-interaction'>
						<LikeCommentButton
							comments={comments}
							setComments={setComments}
							commentId={comment._id}
						/>
						<div>{formatDistanceToNowStrict(new Date(comment.date))}</div>
					</div>
					{comment.likes !== 0 && (
						<button
							className='single-post-icon comment-react'
							onClick={getCommentLikes}
						>
							<img src={thumbsUp} alt='icon' draggable={false} />
							<span>{comment.likes}</span>
						</button>
					)}
				</div>
			</div>
			{likeModal && (
				<LikeCommentPopup
					likeModal={likeModal}
					setLikeModal={setLikeModal}
					commentLikes={commentLikes}
				/>
			)}
		</div>
	);
}
export default Comments;
