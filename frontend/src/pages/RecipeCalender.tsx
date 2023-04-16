import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom';
import { getRecipeCalender } from '../apis/calender';
import { getRecipeInfo } from '../apis/recipes';
import RecipePopup from '../components/popup/RecipePopup';
import { recipeInitalState, RecipeType } from '../types/recipeTypes';

interface Data {
	date: string;
	recipeName: string;
	recipeId: string;
}

function RecipeCalender() {
	const token = Cookies.get('token');
	const navigate = useNavigate();

	const [active, setActive] = useState<number>();
	const [smallScreen, setSmallScreen] = useState(false);
	const [recipeModal, setRecipeModal] = useState(false);
	const [filter, setFilter] = useState('upcoming');
	const [calender, setCalender] = useState<Data[]>([]);
	const [recipeInformation, setRecipeInformation] =
		useState<RecipeType>(recipeInitalState);

	useEffect(() => {
		getRecipeCalender(filter, token).then(data => {
			const test = data.map((data: Data) => {
				return {
					date: data.date,
					recipeName: data.recipeName,
					recipeId: data.recipeId,
				};
			});
			setCalender(test);
		});
	}, [filter]);
	useEffect(() => {
		if (window.innerWidth < 768) {
			setSmallScreen(true);
		}

		function reportWindowSize() {
			if (window.innerWidth < 768) {
				setSmallScreen(true);
				setActive(999);
			} else {
				setSmallScreen(false);
			}
		}
		window.addEventListener('resize', reportWindowSize);
		//  Cleanup for componentWillUnmount
		return () => window.removeEventListener('resize', reportWindowSize);
	}, []);

	const changeFilter = (filterType: string) => {
		if (filterType === filter) return;
		setActive(999);
		return setFilter(filterType);
	};

	const getRecipeInformation = (recipeId: string, index: number) => {
		getRecipeInfo(recipeId).then(data => {
			setRecipeInformation(data);
			if (window.innerWidth < 768) {
				setRecipeModal(true);
			} else {
				setActive(index);
			}
		});
	};

	return (
		<div className='container p-3 bg-white mt-3 rounded'>
			<div className='recipe-calender-container'>
				<div className='recipe-calender'>
					<Tab.Container id='calender-filter' defaultActiveKey='#upcoming'>
						<ListGroup>
							<Row>
								<ListGroup.Item
									className=' w-50 rounded-1 d-flex justify-content-center'
									action
									href='#upcoming'
									onClick={() => changeFilter('upcoming')}
								>
									Upcoming
								</ListGroup.Item>
								<ListGroup.Item
									className=' w-50 rounded-1 d-flex justify-content-center'
									action
									href='#completed'
									onClick={() => changeFilter('completed')}
								>
									Completed
								</ListGroup.Item>
							</Row>
						</ListGroup>
					</Tab.Container>
					<div className='d-flex flex-column mt-4'>
						{calender.map((data, index) => (
							<button
								className={`border-0 fs-4 text-start ${
									active === index ? ' bg-primary text-white' : 'bg-white'
								}`}
								key={index}
								onClick={() => getRecipeInformation(data.recipeId, index)}
							>
								<div className='p-1 border-bottom'>
									<div className='fs-5 fw-bold mb-2'>
										{new Date(data.date).toLocaleDateString('en-us', {
											weekday: 'long',
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})}
									</div>

									<div className='fs-5'>{data.recipeName}</div>
								</div>
							</button>
						))}
					</div>
				</div>
				{smallScreen ? (
					<RecipePopup
						recipeInformation={recipeInformation}
						setRecipeModal={setRecipeModal}
						recipeModal={recipeModal}
					/>
				) : (
					<div className='col-8 border-start ps-2 d-flex flex-column'>
						<div className='fs-3 my-3'>{recipeInformation.recipeName}</div>
						<button
							className='text-start border-0 ps-0 bg-white text-secondary text-decoration-underline'
							onClick={() =>
								navigate(`/profile/${recipeInformation.createdBy._id}`)
							}
						>
							{recipeInformation.createdBy.name}
						</button>
						<div className='d-flex flex-column gap-2'>
							<div className='d-flex w-100 mt-3 '>
								<div className='p-2 border-start border-end'>
									Prep: {recipeInformation.prepTime} minutes
								</div>
								<div className='p-2 x'>
									Cook: {recipeInformation.cookTime} minutes
								</div>
								<div className='p-2 border-start border-end'>
									Servings: {recipeInformation.servings}
								</div>
							</div>
							<div className='mt-3 d-flex flex-column'>
								<span className='mb-2'>Ingredients:</span>
								<ol>
									{recipeInformation.ingredients.map((ingredient, index) => (
										<li key={index}>
											{ingredient.quantity}
											{ingredient.unit} {ingredient.ingredient}
										</li>
									))}
								</ol>
							</div>
							<div className='mt-3 d-flex flex-column'>
								<span className='mb-2'>Instructions:</span>
								<ol>
									{recipeInformation.instructions.map((instruction, index) => (
										<li key={index}>{instruction.instruction}</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default RecipeCalender;
