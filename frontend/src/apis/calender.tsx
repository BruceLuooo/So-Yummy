import axios from 'axios';
import { RecipeType } from '../types/recipeTypes';

interface Date {
	month: string;
	year: string;
	day: string;
}

export const getRecipeCalender = async (
	filter: string,
	token: string | undefined,
) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/calenders/get-recipe-calender/${filter}`,
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);

	return response.data;
};

export const addToCalenderAPI = async (
	date: Date,
	recipeId: string,
	recipeInformation: RecipeType,
	token: string,
) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/calenders/add-recipe-to-calender`,
		{
			recipeId,
			date: new Date(`${date.month} ${date.day} ${date.year}`),
			recipeInformation,
		},
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};
