import axios from 'axios';

export const getRecipes = async (id: string | undefined) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${id}/recipes`,
	);

	return response.data;
};

export const getSingleRecipeAPI = async (id: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${id}/getSingleRecipe`,
	);

	return response.data;
};

export const getSavedRecipes = async (id: string | undefined) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${id}/saved-recipes-by-user`,
	);
	return response.data;
};

export const getRecipeInfo = async (recipeId: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${recipeId}/getSingleRecipe`,
	);
	return response.data;
};

export const createNewRecipe = async (
	formData: FormData,
	token: string | undefined,
) => {
	const response = await axios.post(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/createNewRecipe`,
		formData,
		{
			headers: {
				Authorization: JSON.parse(token!),
				'Content-Type': 'multipart/form-data',
			},
		},
	);

	return response.data;
};

export const doesUserHaveCorrectIngredients = async (
	recipeId: string,
	token: string,
) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/${recipeId}/doesUserHaveCorrectIngredients`,
		{ headers: { Authorization: JSON.parse(token!) } },
	);
	return response.data;
};
