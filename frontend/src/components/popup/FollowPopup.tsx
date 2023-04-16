import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import FollowPopupButton from './FollowPopupButton';
import PostContext from '../../context/postContext';
import { PostContextType } from '../../types/postTypes';

type Props = {
	openModal: boolean;
	setOpenModal: Function;
	follow: {
		avatar: string;
		id: string;
		name: string;
	}[];
	title: string;
};

function FollowPopup({ openModal, setOpenModal, follow, title }: Props) {
	const navigate = useNavigate();
	const { setPostInformation } = useContext(PostContext) as PostContextType;
	const [loggedIn, setLoggedIn] = useState(false);
	const userId = Cookies.get('userId');
	const { id } = useParams();

	useEffect(() => {
		if (
			userId !== undefined &&
			JSON.parse(userId) === id &&
			title !== 'Followers'
		) {
			setLoggedIn(true);
		}
	}, []);

	const linkToProfile = (id: string) => {
		setOpenModal(false);
		setPostInformation({ data: [], hasMore: true });
		navigate(`/profile/${id}`);
	};

	return (
		<Modal
			show={openModal}
			animation={false}
			onHide={() => setOpenModal(false)}
			scrollable={true}
			dialogClassName='modal-height'
		>
			<Modal.Header>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup>
					{follow.map((follow, index) => (
						<div className='d-flex justify-content-between align-items-center'>
							<Button
								key={index}
								className='d-flex align-items-center gap-2 mb-2 bg-white text-dark border-0 '
								onClick={() => linkToProfile(follow.id)}
							>
								<img
									src={follow.avatar}
									className='follow-avatar'
									draggable={false}
								/>
								<span>{follow.name}</span>
							</Button>
							{loggedIn && <FollowPopupButton id={follow.id} />}
						</div>
					))}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='light' onClick={() => setOpenModal(false)}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FollowPopup;
