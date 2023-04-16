import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import thumbsUp from '../../assets/thumbsUp.svg';
import LikeButton from '../profile/LikeButton';
import Comments from '../comments/Comments';
import AddComments from '../comments/AddComments';
import Cookies from 'js-cookie';
import LikePopup from '../popup/LikePopup';
import { PostContextType, PostInformation } from '../../types/postTypes';
import { formatDistanceToNowStrict } from 'date-fns';
import { getPostComments, moreComments, postLikes } from '../../apis/Posts';
import { CommentsData } from '../../types/commentTypes';
import { useNavigate } from 'react-router-dom';
import PostContext from '../../context/postContext';

type Props = {
	post: PostInformation;
};

function SinglePost({ post }: Props) {
	const navigate = useNavigate();
	const { setPostInformation } = useContext(PostContext) as PostContextType;
	const [comments, setComments] = useState<CommentsData[]>([]);
	const [commentsPageNumber, setCommentsPageNumber] = useState<number>(2);
	const [showComments, setShowComments] = useState(false);
	const [displayUserWhoLiked, setDisplayUserWhoLiked] = useState({
		likes: [],
	});
	const [likeModal, setLikeModal] = useState(false);
	const token = Cookies.get('token');

	useEffect(() => {
		setShowComments(false);
	}, [post._id]);

	const getComments = async () => {
		getPostComments(post._id).then(data => {
			setComments(data);
			setShowComments(true);
		});
	};

	const loadMoreComments = async () => {
		moreComments(post._id, commentsPageNumber).then(data => {
			let newArray = [...comments, ...data];
			setComments(newArray);
			setCommentsPageNumber(commentsPageNumber + 1);
		});
	};

	const getLikes = async () => {
		postLikes(post._id).then(data => {
			setDisplayUserWhoLiked(data);
			setLikeModal(true);
		});
	};

	const goToProfile = (id: string) => {
		setPostInformation({ data: [], hasMore: true });
		navigate(`/profile/${id}`);
	};

	return (
		<div className='single-post-container'>
			<div className='single-post-userinfo'>
				<button
					className='go-to-profile-button'
					onClick={() => goToProfile(post.authorId._id)}
				>
					<img
						className='small-profile-image'
						src={post.authorId.avatar}
						alt='avatar'
						draggable={false}
					/>
				</button>
				<div className='single-post-user'>
					<button
						className='go-to-profile-button'
						onClick={() => goToProfile(post.authorId._id)}
					>
						{post.authorName}
					</button>
					<div className='single-post-date'>
						<span>{post.authorId.title}</span>
						<div className='save-recipe'>
							<span>{formatDistanceToNowStrict(new Date(post.date))}</span>
						</div>
					</div>
				</div>
			</div>
			<p>{post.description}</p>
			{post.images.length !== 0 && (
				<div className='d-flex gap-1'>
					{post.images.map((image, index) => (
						<img key={index} className='w-25' src={image} alt='' />
					))}
				</div>
			)}
			<div className='single-post-interactions'>
				<div className='single-post-react'>
					{post.likes !== 0 && (
						<button className='single-post-icon' onClick={getLikes}>
							<img src={thumbsUp} alt='icon' draggable={false} />
							<span className='ms-1'>{post.likes}</span>
						</button>
					)}
				</div>
				<div className='single-post-comment'>
					<div className='single-post-react'>
						<div className='single-post-icon'>
							<span>{post.comments} comments</span>
						</div>
					</div>
				</div>
			</div>
			<div className='interaction-container '>
				<LikeButton postId={post._id} />
				<div className='interaction-button'>
					<Button
						className='w-100 border-0 rounded-0 bg-transparent text-dark'
						onClick={getComments}
					>
						Comment
					</Button>
				</div>
			</div>
			{showComments && (
				<div className='comments-container'>
					{token !== undefined && (
						<AddComments
							post={post}
							comments={comments}
							setComments={setComments}
						/>
					)}
					{comments.map((comment, index) => (
						<Comments
							comment={comment}
							key={index + 20}
							comments={comments}
							setComments={setComments}
						/>
					))}
					<button
						className='border-0 rounded text-secondary'
						onClick={loadMoreComments}
					>
						View More Comments
					</button>
				</div>
			)}
			{likeModal && (
				<LikePopup
					likeModal={likeModal}
					setLikeModal={setLikeModal}
					displayUserWhoLiked={displayUserWhoLiked}
				/>
			)}
		</div>
	);
}

export default SinglePost;
