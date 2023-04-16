import React, { useState } from 'react';
import {
	CreateRecipeType,
	createRecipeInitalState,
} from '../types/recipeTypes';

export default function useHandleCreateRecipe() {
	const [recipe, setRecipe] = useState<CreateRecipeType>(
		createRecipeInitalState,
	);
	const [ingredientError, setIngredientError] = useState({
		error: false,
		message: '',
	});
	const [instructionError, setInstructionError] = useState({
		error: false,
		message: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipe({
			...recipe,
			[e.target.id]: e.target.value,
		});
	};

	const addNewIngredient = () => {
		const isFormCompleted = recipe.ingredients.findIndex(
			ingredient =>
				ingredient.ingredient === '' ||
				ingredient.type === '' ||
				ingredient.quantity === 0,
		);
		if (isFormCompleted !== -1) {
			return setIngredientError({
				error: true,
				message: 'Ingredient, Type, or Quantity is not filled in',
			});
		} else {
			setIngredientError({
				error: false,
				message: '',
			});
			setRecipe(prev => ({
				...prev,
				ingredients: [
					...prev.ingredients,
					{
						id: Math.random(),
						ingredient: '',
						type: '',
						quantity: 0,
						unit: '',
					},
				],
			}));
		}
	};
	const updateIngredientListState = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) => {
		setRecipe(prev => ({
			...prev,
			ingredients: prev.ingredients.map(ingredient => {
				if (ingredient.id === id) {
					return { ...ingredient, [e.target.id]: e.target.value };
				}
				return ingredient;
			}),
		}));
	};

	const addInstruction = () => {
		const isInstructionCompleted = recipe.instructions.findIndex(
			instruction => instruction.instruction === '',
		);

		if (isInstructionCompleted !== -1) {
			return setInstructionError({
				error: true,
				message: 'Please fill in instruction',
			});
		} else {
			setInstructionError({
				error: false,
				message: '',
			});
			setRecipe(prev => ({
				...prev,
				instructions: [
					...prev.instructions,
					{
						id: Math.random(),
						instruction: '',
					},
				],
			}));
		}
	};

	const updateInstructions = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) => {
		setRecipe(prev => ({
			...prev,
			instructions: prev.instructions.map(instruction => {
				if (instruction.id === id) {
					return { ...instruction, [e.target.id]: e.target.value };
				}
				return instruction;
			}),
		}));
	};

	const deleteIngredient = (id: number) => {
		const filteredIngredients = recipe.ingredients.filter(
			ingredient => ingredient.id !== id,
		);

		setRecipe(prev => ({
			...prev,
			ingredients: [...filteredIngredients],
		}));

		setIngredientError({
			error: false,
			message: '',
		});
	};
	const deleteInstruction = (id: number) => {
		const filteredInstructions = recipe.instructions.filter(
			instruction => instruction.id !== id,
		);

		setRecipe(prev => ({
			...prev,
			instructions: [...filteredInstructions],
		}));

		setInstructionError({
			error: false,
			message: '',
		});
	};

	const addImage = (file: File) => {
		setRecipe(prev => ({
			...prev,
			image: [...prev.image, URL.createObjectURL(file)],
		}));
	};

	return {
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
	};
}
