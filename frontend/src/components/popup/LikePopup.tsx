import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { LikedBy } from '../../types/likeTypes';

type Props = {
	likeModal: boolean;
	setLikeModal: Function;
	displayUserWhoLiked: {
		likes: LikedBy[];
	};
};

function LikePopup({ likeModal, setLikeModal, displayUserWhoLiked }: Props) {
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
					{displayUserWhoLiked.likes.map((user, index) => (
						<Button
							key={index}
							className='d-flex align-items-center gap-2 mb-2 bg-white text-dark'
							onClick={() => linkToProfile(user._id)}
						>
							<img
								className='follow-avatar'
								src={user.avatar}
								alt='profile picture'
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

export default LikePopup;
