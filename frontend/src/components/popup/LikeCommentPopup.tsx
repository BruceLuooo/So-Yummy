import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { LikedBy } from '../../types/likeTypes';

type Props = {
	likeModal: boolean;
	setLikeModal: Function;
	commentLikes: LikedBy[];
};

function LikeCommentPopup({ likeModal, setLikeModal, commentLikes }: Props) {
	const navigate = useNavigate();

	const linkToProfile = (id: string) => {
		setLikeModal(false);
		navigate(`/profile/${id}`);
	};

	return (
		<Modal
			show={likeModal}
			animation={false}
			onHide={() => setLikeModal(false)}
		>
			<Modal.Header>
				<Modal.Title>Users Who Like This Post</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup>
					{commentLikes.map((user, index) => (
						<Button
							key={index}
							className='d-flex align-items-center gap-2 mb-2 bg-white text-dark'
							onClick={() => linkToProfile(user._id)}
						>
							<img
								src={user.avatar}
								alt='profile picture'
								className='follow-avatar'
								draggable={false}
							/>
							<span>{user.name}</span>
						</Button>
					))}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setLikeModal(false)}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LikeCommentPopup;
