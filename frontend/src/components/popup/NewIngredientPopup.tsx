import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IngredientDetail } from '../../types/ingredientListTypes';
import { addIngredientAPI } from '../../apis/user';

type Props = {
	openIngredientModal: boolean;
	setOpenIngredientModal: Function;
	setIngredientList: Function;
	ingredientList: IngredientDetail[];
	filter: string;
};

function NewIngredientPopup({
	openIngredientModal,
	setOpenIngredientModal,
	setIngredientList,
	ingredientList,
	filter,
}: Props) {
	const token = Cookies.get('token');
	const [error, setError] = useState({ active: false, message: '' });
	const [ingredient, setIngredient] = useState<IngredientDetail>({
		ingredient: '',
		type: '',
		quantity: '',
		unit: '',
	});

	const updateIngredient = (
		e:
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>,
	) => {
		setIngredient(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const addIngredient = async () => {
		if (token === undefined) return;
		addIngredientAPI(ingredient, token)
			.then(() => {
				if (filter.toLocaleLowerCase() === ingredient.type) {
					const newIngredientList = [...ingredientList, ingredient];
					setIngredientList(newIngredientList);
					return setOpenIngredientModal(false);
				}
				return setOpenIngredientModal(false);
			})
			.catch(error => {
				if (axios.isAxiosError(error)) {
					console.log(error.response!.data);
					setError({ active: true, message: error.response!.data });
				}
			});
	};

	return (
		<Modal
			show={openIngredientModal}
			animation={false}
			onHide={() => setOpenIngredientModal(false)}
		>
			<Modal.Header>
				<Modal.Title>Add New Ingredient</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Row>
						<Col xs={4} md={4}>
							<Form.Label>Ingredient</Form.Label>
							<Form.Control
								type='text'
								id='ingredient'
								value={ingredient.ingredient}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									updateIngredient(e)
								}
							/>
						</Col>
						<Col xs={4} md={4}>
							<Form.Label>Type</Form.Label>
							<Form.Select
								id='type'
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
									updateIngredient(e)
								}
							>
								<option></option>
								<option>meats</option>
								<option>vegetables</option>
								<option>fruits</option>
								<option>spices</option>
								<option>dairy</option>
								<option>carbs</option>
								<option>liquids</option>
							</Form.Select>
						</Col>
						<Col xs={2} md={2}>
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type='text'
								id='quantity'
								value={ingredient.quantity}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									updateIngredient(e)
								}
							/>
						</Col>
						<Col xs={2}>
							<Form.Label>Units</Form.Label>
							<Form.Control
								as='select'
								id='unit'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									updateIngredient(e)
								}
							>
								<option></option>
								<option>kg</option>
								<option>lbs</option>
								<option>g</option>
								<option>oz</option>
								<option>L</option>
								<option>ml</option>
								<option>tbsp</option>
								<option>tsp</option>
								<option>cups</option>
							</Form.Control>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				{error.active && <div className='text-danger'>{error.message}</div>}
				<Button variant='primary' onClick={() => addIngredient()}>
					Add New Ingredient
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NewIngredientPopup;
