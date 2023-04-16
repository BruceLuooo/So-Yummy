import axios from 'axios';

export const getIngredientListAPI = async (id: string, filter: string) => {
	const response = await axios.get(
		`${
			process.env.REACT_APP_LOCALHOST_URL
		}/api/users/${id}/getIngredients/${filter.toLowerCase()}`,
	);
	return response.data;
};
