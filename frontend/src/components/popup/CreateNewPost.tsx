import { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import PostContext from '../../context/postContext';
import { PostContextType } from '../../types/postTypes';
import Cookies from 'js-cookie';
import { createPostAPI } from '../../apis/Posts';
import plusIcon from '../../assets/whitePlus.png';
import axios from 'axios';

type Props = {
	postModal: boolean;
	setPostModal: Function;
};

interface NewPost {
	description: string;
	image: string[];
}

function CreateNewPost({ postModal, setPostModal }: Props) {
	const { setPostInformation, postInformation } = useContext(
		PostContext,
	) as PostContextType;
	const token = Cookies.get('token');

	const [newPost, setNewPost] = useState<NewPost>({
		description: '',
		image: [],
	});
	const [error, setError] = useState({ active: false, message: '' });
	const [files, setFiles] = useState<File[]>([]);
	const picture = useRef(null);

	const openFile = () => {
		// @ts-ignore
		picture.current.click();
	};

	useEffect(() => {
		if (files.length !== 0) {
			const latestFile = files[files.length - 1];
			return setNewPost(prev => ({
				...prev,
				image: [...prev.image, URL.createObjectURL(latestFile)],
			}));
		}

		return;
	}, [files]);

	const addPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			setFiles(prev => [...prev, e.target.files![0]]);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPost(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const createNewPost = async () => {
		if (token === undefined)
			return setError({
				active: true,
				message: 'You must be signed in to post',
			});

		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('images', files[i]);
		}

		formData.append('description', newPost.description);

		createPostAPI(formData, token)
			.then(data => {
				let newArray = [...postInformation.data];
				newArray.unshift({
					...data,
					comments: 0,
					likes: 0,
				});
				setPostInformation({
					data: newArray,
					hasMore: postInformation.hasMore,
				});
				setPostModal(false);
			})
			.catch(error => {
				if (axios.isAxiosError(error)) {
					return setError({
						active: true,
						message: `${error.response!.data}`,
					});
				}
			});
	};

	return (
		<Modal show={postModal} size='lg' onHide={() => setPostModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Create New Post</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form>
						<Form.Control
							className='mb-1'
							as='textarea'
							rows={3}
							onChange={handleChange}
							id='description'
							value={newPost.description}
							placeholder='What is on your mind'
						/>
						{newPost.image.length !== 0 && (
							<div className='d-flex gap-2 fs-3 mt-1 pt-4 w-100'>
								<div className='d-flex gap-2'>
									<div>
										{newPost.image.map((image, index) => (
											<img
												key={index}
												src={image}
												alt='recipe image'
												className='recipe-image'
												draggable={false}
											/>
										))}
									</div>
								</div>
							</div>
						)}
						<Button
							className='mt-4 d-flex align-items-center gap-1'
							onClick={openFile}
							disabled={newPost.image.length >= 3}
						>
							<img
								className='white-plus-icon'
								src={plusIcon}
								alt=''
								draggable={false}
							/>
							<span>Add Photo</span>
						</Button>
						<input
							type='file'
							ref={picture}
							multiple
							name='images'
							style={{ display: 'none' }}
							onChange={addPhoto}
						/>
					</Form>
					{error.active && (
						<div className='mt-2 text-danger'>{error.message}</div>
					)}
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setPostModal(false)}>
					Close
				</Button>
				<Button variant='primary' onClick={createNewPost}>
					Post
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateNewPost;
