import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import PostContext from '../../context/postContext';
import { PostContextType } from '../../types/postTypes';
import { CommentsData } from '../../types/commentTypes';
import { addNewCommentAPI } from '../../apis/comments';
import ProfileContext from '../../context/profileContext';
import { ProfileContextType } from '../../types/profileTypes';

type Props = {
	post: Posts;
	comments: CommentsData[];
	setComments: Function;
};

interface Posts {
	_id: string;
	authorId: {
		avatar: string;
	};
}

function AddComments({ post, comments, setComments }: Props) {
	const { setPostInformation, postInformation } = useContext(
		PostContext,
	) as PostContextType;
	const { profileInformation } = useContext(
		ProfileContext,
	) as ProfileContextType;

	const token = Cookies.get('token');
	const [newComment, setNewComment] = useState('');

	const addNewComment = () => {
		addNewCommentAPI(post._id, newComment, token).then(data => {
			let newArray = [...comments];
			newArray.unshift(data);

			setComments(newArray);
			setNewComment('');

			const copy = [...postInformation.data];

			const index = copy.findIndex(data => data._id === post._id);

			if (index !== -1) {
				copy[index].comments = copy[index].comments + 1;

				setPostInformation(prev => ({
					...prev,
					data: copy,
				}));
			}
		});
	};

	return (
		<div className='add-comment'>
			<div>
				<img
					src={profileInformation.avatar}
					alt=''
					className='comment-image'
					draggable={false}
				/>
			</div>
			<input
				className='comment-input'
				type='text'
				placeholder='Write a comment...'
				value={newComment}
				onChange={e => setNewComment(e.target.value)}
			/>
			<Button
				className=' ms-2 btn-sm text-sm p-1'
				disabled={newComment.length === 0 && true}
				onClick={addNewComment}
			>
				Comment
			</Button>
		</div>
	);
}

export default AddComments;
