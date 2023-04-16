import axios from 'axios';
import { IngredientDetail } from '../types/ingredientListTypes';
import { UserData } from '../types/profileTypes';

export const getUserInfo = async (id: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/${id}`,
	);

	return response.data;
};

export const updateProfileAPI = async (
	id: string,
	editProfile: UserData,
	token: string,
) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/updateUserInformation/${id}`,
		editProfile,
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};

export const updateProfilePictureAPI = async (
	data: FormData,
	token: string,
) => {
	const response = await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/update-profile-picture`,
		data,
		{
			headers: {
				Authorization: JSON.parse(token!),
				'Content-Type': 'multipart/form-data',
			},
		},
	);
	return response.data;
};

export const checkIsFollowing = async (id: string, token: string) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/checkFollowStatus/${id}`,
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
	return data;
};

export const unfollowProfileAPI = async (id: string, token: string) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/unfollow/${id}`,
		{},
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};

export const followProfileAPI = async (id: string, token: string) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/follow/${id}`,
		{},
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};

export const getFollowingAPI = async (id: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/${id}/following`,
	);

	return response.data;
};

export const getFollowersAPI = async (id: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/${id}/followers`,
	);

	return response.data;
};

export const addIngredientAPI = async (
	ingredient: IngredientDetail,
	token: string,
) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/add-new-ingredient-to-inventory`,

		ingredient,
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};
