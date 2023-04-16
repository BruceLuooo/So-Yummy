import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import LoginPopup from '../components/popup/LoginPopup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import serve from '../assets/serving.svg';
import cook from '../assets/cook.svg';
import OpenImagePopup from '../components/popup/OpenImagePopup';
import { recipeInitalState, RecipeType } from '../types/recipeTypes';
import LoadingPlaceHolder from '../components/loading/LoadingPlaceHolder';
import placeholder from '../assets/7.png';
import FeedbackForm from '../components/feedback/FeedbackForm';
import FeedbackStats from '../components/feedback/FeedbackStats';
import FeedbackList from '../components/feedback/FeedbackList';

function Recipe() {
	const { id } = useParams();
	const navigate = useNavigate();
	const userId = Cookies.get('userId');
	const token = Cookies.get('token');
	const [loginModal, setLoginModal] = useState(false);
	const [showSaveRecipeButton, setShowSaveRecipeButton] = useState(false);
	const [openImage, setOpenImage] = useState(false);
	const [recipeSaved, setRecipeSaved] = useState(false);
	const [recipeInformation, setRecipeInformation] =
		useState<RecipeType>(recipeInitalState);

	const saveRecipe = async () => {
		if (userId === undefined) {
			return setLoginModal(true);
		}
		try {
			await axios
				.put(
					`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${id}/save-recipe`,
					{},
					{
						headers: {
							Authorization: JSON.parse(token!),
						},
					},
				)
				.then(() => {
					setRecipeSaved(true);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const unsaveRecipe = async () => {
		try {
			await axios
				.put(
					`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${id}/unsave-recipe`,
					{},
					{
						headers: {
							Authorization: JSON.parse(token!),
						},
					},
				)
				.then(() => {
					return setRecipeSaved(false);
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getRecipeInformation = async () => {
			await axios
				.get(
					`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${id}/getSingleRecipe`,
				)
				.then(({ data }) => {
					setRecipeInformation({ ...data, loading: false });
					if (userId !== undefined) {
						if (JSON.parse(userId) === data.createdBy._id) {
							setShowSaveRecipeButton(false);
						} else {
							setShowSaveRecipeButton(true);
						}
					}
				});
		};
		getRecipeInformation();
	}, [id]);

	useEffect(() => {
		const didUserAlreadySave = async () => {
			await axios
				.get(
					`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${id}/did-user-already-save`,
					{
						headers: {
							Authorization: JSON.parse(token!),
						},
					},
				)
				.then(({ data }) => {
					if (data === false) {
						return setRecipeSaved(false);
					} else {
						return setRecipeSaved(true);
					}
				});
		};

		didUserAlreadySave();
	}, [id]);

	useEffect(() => {
		const handler = () => {
			setOpenImage(false);
		};

		window.addEventListener('click', handler);
	}, []);

	const openImageModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setOpenImage(true);
	};

	return (
		<div className='tester'>
			<div className='main-container'>
				<div className='recipe-header'>
					<div className='recipe-header-leftside'>
						{recipeInformation.loading ? (
							<div style={{ position: 'relative' }}>
								<LoadingPlaceHolder
									extraStyles={{
										height: '400px',
										top: '0',
										left: '0',
										width: '400px',
									}}
									container
								/>
								<img
									className='w-100'
									src={placeholder}
									alt='Food'
									draggable={false}
								/>
							</div>
						) : (
							<img
								className='w-100'
								src={recipeInformation.images[0]}
								alt='Food'
								draggable={false}
							/>
						)}
						{showSaveRecipeButton && (
							<div>
								{recipeSaved ? (
									<Button className='w-100' onClick={unsaveRecipe}>
										Unsave Recipe
									</Button>
								) : (
									<Button className='w-100' onClick={saveRecipe}>
										Save Recipe
									</Button>
								)}
							</div>
						)}
					</div>
					<div className='recipe-description'>
						<h1>{recipeInformation.recipeName}</h1>
						<button
							className='border-0 w-50 text-start text-secondary text-decoration-underline ps-0 bg-white'
							onClick={() =>
								navigate(`/profile/${recipeInformation.createdBy._id}`)
							}
						>
							<strong>{recipeInformation.createdBy.name}</strong>
						</button>
						<div>{recipeInformation.description}</div>
						<div className='recipe-stats'>
							<div className='recipe-time'>
								<div>
									<img
										src={cook}
										alt='avatar'
										className='recipe-time-icon'
										draggable={false}
									/>
								</div>
								<div>
									<div>Prep: {recipeInformation.prepTime} minutes</div>
									<div>Cook: {recipeInformation.cookTime} minutes</div>
								</div>
							</div>
							<div className='recipe-time'>
								<div>
									<img
										src={serve}
										alt='avatar'
										className='recipe-time-icon'
										draggable={false}
									/>
								</div>
								<span>Serve: {recipeInformation.servings}</span>
							</div>
						</div>
						<div>
							{recipeInformation.loading ? (
								<div style={{ position: 'relative' }}>
									<LoadingPlaceHolder
										extraStyles={{
											height: '160px',
											top: '0',
											left: '0',
											width: '150px',
										}}
										container
									/>
									<img
										className='w-25'
										src={placeholder}
										alt='Food'
										draggable={false}
									/>
								</div>
							) : (
								<button
									className='w-25 position-relative bg-white border-0'
									onClick={openImageModal}
								>
									<img
										className='w-100 opacity-50'
										src={recipeInformation.images[0]}
										alt=''
										draggable={false}
									/>
									<span className='fs-4 position-absolute top-50 start-50 translate-middle '>
										+{recipeInformation.images.length}
									</span>
								</button>
							)}
						</div>
					</div>
				</div>
				<Tab.Container
					id='list-group-tabs-example'
					defaultActiveKey='#ingredients'
				>
					<Row className='pb-4 gap-3'>
						<Col sm={4}>
							<ListGroup>
								<ListGroup.Item action href='#ingredients'>
									Ingredients
								</ListGroup.Item>
								<ListGroup.Item action href='#steps'>
									Cooking Steps
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col sm={6}>
							<Tab.Content>
								<Tab.Pane eventKey='#ingredients'>
									<ListGroup as='ol' numbered>
										{recipeInformation.ingredients.map((ingredient, index) => (
											<ListGroup.Item as='li' key={index}>
												{ingredient.quantity}
												{ingredient.unit} {ingredient.ingredient}
											</ListGroup.Item>
										))}
									</ListGroup>
								</Tab.Pane>
								<Tab.Pane eventKey='#steps'>
									<ListGroup as='ol' numbered>
										{recipeInformation.instructions.map(
											(instruction, index) => (
												<ListGroup.Item as='li' key={index}>
													{instruction.instruction}
												</ListGroup.Item>
											),
										)}
									</ListGroup>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
				<div className='feedback-container'>
					{token && <FeedbackForm />}
					<FeedbackStats />
					<FeedbackList />
				</div>
			</div>
			{loginModal && (
				<LoginPopup setLoginModal={setLoginModal} loginModal={loginModal} />
			)}
			{openImage && <OpenImagePopup images={recipeInformation.images} />}
		</div>
	);
}

export default Recipe;
