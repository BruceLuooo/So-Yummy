import { useContext, useState } from 'react';
import ProfileContext from '../../context/profileContext';
import { ProfileContextType } from '../../types/profileTypes';
import CreateNewPost from '../popup/CreateNewPost';

function CreatePost() {
	const { profileInformation } = useContext(
		ProfileContext,
	) as ProfileContextType;
	const [postModal, setPostModal] = useState(false);

	return (
		<div className='create-post-container'>
			<img
				className='small-profile-image'
				src={profileInformation.avatar}
				alt=''
				draggable={false}
			/>
			<button
				className='btn btn-default w-100  p-2 border-light outline-0 bg-light text-start rounded-5 post-button'
				onClick={() => setPostModal(true)}
			>
				Create a new post...
			</button>
			{postModal && (
				<CreateNewPost postModal={postModal} setPostModal={setPostModal} />
			)}
		</div>
	);
}

export default CreatePost;
