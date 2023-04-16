import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingPlaceHolder from '../loading/LoadingPlaceHolder';
import { RecipeType } from '../../types/recipeTypes';
import { defaultDate, months, years } from '../../constants/constants';
import { doesUserHaveCorrectIngredients } from '../../apis/recipes';
import { addToCalenderAPI } from '../../apis/calender';
import { Link, useParams } from 'react-router-dom';

type Props = {
	recipeId: string;
	openModal: boolean;
	setOpenModal: Function;
	recipeInformation: RecipeType;
};

function AddToCalenderPopup({
	recipeId,
	openModal,
	setOpenModal,
	recipeInformation,
}: Props) {
	const token = Cookies.get('token');
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [ableToAddToCalender, setAbleToAddToCalender] = useState(false);
	const [missingIngredients, setMissingIngredients] = useState<string[]>([]);
	const [date, setDate] = useState(defaultDate);
	const [error, setError] = useState({ active: false, message: '' });

	useEffect(() => {
		doesUserHaveCorrectIngredients(recipeId, token!).then(data => {
			if (data === true) {
				setAbleToAddToCalender(true);
				return setTimeout(() => {
					setLoading(false);
				}, 800);
			} else {
				setMissingIngredients(data);
				return setTimeout(() => {
					setLoading(false);
				}, 800);
			}
		});
	}, []);

	const addToCalender = async () => {
		if (date.day === '' || date.month === '') {
			return setError({ active: true, message: 'Please fill in all fields' });
		} else {
			addToCalenderAPI(date, recipeId, recipeInformation, token!)
				.then(() => {
					setOpenModal(false);
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDate(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<Modal
			show={openModal}
			size='lg'
			onHide={() => setOpenModal(false)}
			dialogClassName='modal-height'
		>
			<Modal.Header closeButton>
				<Modal.Title>{recipeInformation.recipeName}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container className='recipe-header'>
					<div className='w-75'>
						<img
							className='w-100'
							src={recipeInformation.images[0]}
							alt='avatar'
							draggable={false}
						/>
					</div>
					<div className='w-100 d-flex flex-column '>
						<div className='d-flex flex-row justify-content-between mb-3'>
							<span>Cook: {recipeInformation.cookTime} mins</span>
							<span>Prep: {recipeInformation.prepTime} mins</span>
							<span>Serves: {recipeInformation.servings}</span>
						</div>
						<div className='d-flex flex-column mb-2'>
							<span className='mb-2'>Ingredients Required</span>
							<ol className='ps-3'>
								{recipeInformation.ingredients.map((ingredient, index) => (
									<li key={index} className='mt-1'>
										{ingredient.quantity}
										{ingredient.unit} {ingredient.ingredient}
									</li>
								))}
							</ol>
						</div>
						<div className='d-flex flex-column gap-1 mb-3'>
							<span>Select Date</span>
							<Row>
								<Col xs={4}>
									<Form.Label>Month</Form.Label>
									<Form.Control
										className='text-center'
										as='select'
										id='month'
										onChange={updateDate}
									>
										<option></option>
										{months.map((month, index) => (
											<option key={index}>{month}</option>
										))}
									</Form.Control>
								</Col>
								<Col xs={4}>
									<Form.Label>Day</Form.Label>
									<Form.Control
										className='text-center'
										as='input'
										id='day'
										onChange={updateDate}
									/>
								</Col>
								<Col xs={4}>
									<Form.Label>Year</Form.Label>
									<Form.Control
										as='select'
										id='year'
										className='text-center'
										onChange={updateDate}
									>
										{years.map((year, index) => (
											<option key={index}>{year}</option>
										))}
									</Form.Control>
								</Col>
							</Row>
						</div>
						<div style={{ position: 'relative' }}>
							{loading && (
								<LoadingPlaceHolder
									extraStyles={{ height: '100%', top: '0', left: '0' }}
									container
								/>
							)}
							{missingIngredients.length == 0 ? (
								<div className='text-success'>
									You have all the ingredients needed
								</div>
							) : (
								<div>
									<span>Ingredients missing in inventory:</span>
									{missingIngredients.map((ingredient, index) => (
										<div key={index} className='text-danger mt-1'>
											{ingredient}
										</div>
									))}
									<Link
										style={{ textDecoration: 'none' }}
										to={`/profile/${id}/ingredient-list`}
									>
										Add Ingredients To Inventory
									</Link>
								</div>
							)}
						</div>
					</div>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<div style={{ position: 'relative' }}>
					{loading ? (
						<div>
							<LoadingPlaceHolder
								extraStyles={{
									height: '100%',
									top: '0',
									left: '0',
									zIndex: '100',
								}}
								container
							/>
							<Button disabled={true}>Schedule Recipe</Button>
						</div>
					) : (
						<div>
							{ableToAddToCalender ? (
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
								>
									{error.active && (
										<div className='text-danger'>{error.message}</div>
									)}
									<Button variant='primary' onClick={addToCalender}>
										Schedule Recipe
									</Button>
								</div>
							) : (
								<Button variant='secondary' disabled={true}>
									Unable to schedule recipe
								</Button>
							)}
						</div>
					)}
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default AddToCalenderPopup;
