import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createNewRecipe } from '../apis/recipes';
import useHandleCreateRecipe from '../hooks/useHandleCreateRecipe';
import plusIcon from '../assets/whitePlus.png';

function CreateRecipe() {
	const {
		recipe,
		handleChange,
		updateIngredientListState,
		addNewIngredient,
		addInstruction,
		updateInstructions,
		deleteIngredient,
		deleteInstruction,
		addImage,
		ingredientError,
		instructionError,
	} = useHandleCreateRecipe();
	const picture = useRef(null);
	const navigate = useNavigate();
	const userId = Cookies.get('userId');
	const [files, setFiles] = useState<File[]>([]);

	const createRecipe = async () => {
		const token = Cookies.get('token');
		const id = Cookies.get('userId');
		const parseId = JSON.parse(id!);

		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('images', files[i]);
		}

		for (var key in recipe) {
			// @ts-ignore
			formData.append(`${key}`, JSON.stringify(recipe[key]));
		}

		createNewRecipe(formData, token)
			.then(() => {
				navigate(`/profile/${parseId}`);
			})
			.catch(error => {
				if (axios.isAxiosError(error)) {
					console.log(error.response!.data);
				}
			});
	};

	useEffect(() => {
		if (files.length !== 0) {
			const latestFile = files[files.length - 1];
			return addImage(latestFile);
		}

		return;
	}, [files]);

	const openFile = () => {
		// @ts-ignore
		picture.current.click();
	};
	const addPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			setFiles(prev => [...prev, e.target.files![0]]);
		}
	};

	return (
		<div className='profile-container'>
			<button
				className='border-0 text-start bg-white text-secondary'
				onClick={() => navigate(`/profile/${JSON.parse(userId!)}`)}
			>
				Go Back
			</button>
			<h1 className='fw-bold'>Create New Recipe</h1>
			<Form>
				<Form.Label className='form-label'>Recipe Name</Form.Label>
				<Form.Control
					className='mb-3'
					type='text'
					onChange={handleChange}
					id='recipeName'
					value={recipe.recipeName}
				/>
				<Form.Label>Recipe Description</Form.Label>
				<Form.Control
					className='mb-3'
					as='textarea'
					rows={3}
					onChange={handleChange}
					id='description'
					value={recipe.description}
				/>

				<Row className='mb-3 d-flex align-items-baseline'>
					<Col xs={4} md={4}>
						<Form.Label>Prep Time (minutes)</Form.Label>
						<Form.Control
							type='text'
							onChange={handleChange}
							id='prep'
							value={recipe.prep}
						/>
					</Col>
					<Col xs={4} md={4}>
						<Form.Label>Cook Time (minutes)</Form.Label>
						<Form.Control
							type='text'
							onChange={handleChange}
							id='cook'
							value={recipe.cook}
						/>
					</Col>
					<Col xs={4} md={4}>
						<Form.Label>Serves</Form.Label>
						<Form.Control
							type='text'
							onChange={handleChange}
							id='serve'
							value={recipe.serve}
						/>
					</Col>
				</Row>
				<div className='border rounded p-4 my-5'>
					<Form.Label className='fs-3 fw-bold pt-4 w-100 '>
						Ingredients
					</Form.Label>
					<ol className='p-1'>
						{recipe.ingredients.map((ingredient, index) => (
							<li>
								<Row key={index}>
									<Col xs={4} md={4} className='p-1 ps-3'>
										<Form.Label>Ingredient</Form.Label>
										<Form.Control
											className='mb-3'
											type='text'
											id='ingredient'
											value={ingredient.ingredient}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												updateIngredientListState(e, ingredient.id)
											}
										/>
									</Col>
									<Col xs={4} md={4} className='p-1'>
										<Form.Label>Type</Form.Label>
										<Form.Control
											as='select'
											id='type'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												updateIngredientListState(e, ingredient.id)
											}
										>
											<option></option>
											<option>Meat</option>
											<option>Vegetable</option>
											<option>Fruit</option>
											<option>Dairy</option>
											<option>Carbs</option>
											<option>Spice</option>
											<option>Liquid</option>
										</Form.Control>
									</Col>
									<Col xs={2} md={2} className='p-1'>
										<Form.Label>Quantity</Form.Label>
										<Form.Control
											className='mb-3'
											type='text'
											id='quantity'
											value={ingredient.quantity}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												updateIngredientListState(e, ingredient.id)
											}
										/>
									</Col>
									<Col xs={2} lg={2} className='p-1'>
										<Form.Label>Units</Form.Label>
										<Form.Control
											as='select'
											id='unit'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												updateIngredientListState(e, ingredient.id)
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
								<Button
									className='btn-danger mb-3'
									size='sm'
									onClick={() => deleteIngredient(ingredient.id)}
								>
									Delete Ingredient
								</Button>
							</li>
						))}
					</ol>
					<div>
						{ingredientError && (
							<div className='text-danger'>{ingredientError.message}</div>
						)}
						<Button
							className='mb-3 d-flex align-items-center gap-1'
							onClick={addNewIngredient}
						>
							<img
								className='white-plus-icon'
								src={plusIcon}
								alt=''
								draggable={false}
							/>
							<span>Add Ingredient</span>
						</Button>
					</div>
				</div>
				<div className='border rounded p-4 my-5'>
					<Form.Label className='fs-3 fw-bold mt-3 pt-4 w-100'>
						Instructions
					</Form.Label>
					<ol className='p-1'>
						{recipe.instructions.map((instruction, index) => (
							<li>
								<Form.Control
									key={index}
									className='mb-3'
									as='textarea'
									rows={1}
									id='instruction'
									value={instruction.instruction}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										updateInstructions(e, instruction.id)
									}
								/>
								<Button
									className='btn-danger mb-3'
									size='sm'
									onClick={() => deleteInstruction(instruction.id)}
								>
									Delete Instruction
								</Button>
							</li>
						))}
					</ol>
					<div>
						{instructionError.error && (
							<div className='text-danger'>{instructionError.message}</div>
						)}
						<Button
							className='mb-3 d-flex align-items-center gap-1'
							onClick={addInstruction}
						>
							<img
								className='white-plus-icon'
								src={plusIcon}
								alt=''
								draggable={false}
							/>
							<span>Add Instruction</span>
						</Button>
					</div>
				</div>
				<div className='d-flex flex-column gap-2 fs-3 mt-3 pt-4 w-100'>
					{recipe.image.length !== 0 && (
						<div className='d-flex gap-1'>
							<div>
								{recipe.image.map((image, index) => (
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
					)}
					<div>
						<Button
							className='mb-5 d-flex align-items-center gap-1'
							onClick={openFile}
							disabled={recipe.image.length >= 3}
						>
							<img
								className='white-plus-icon'
								src={plusIcon}
								alt=''
								draggable={false}
							/>
							<span>Add Photo</span>
						</Button>
					</div>
					<input
						type='file'
						ref={picture}
						multiple
						name='images'
						style={{ display: 'none' }}
						onChange={addPhoto}
					/>
				</div>
			</Form>
			<Button variant='primary' className='w-100 mb-5' onClick={createRecipe}>
				Create Recipe
			</Button>
		</div>
	);
}

export default CreateRecipe;
