import axios from 'axios';

export const likeCommentAPI = async (commentId: string, token: string) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/comments/${commentId}/likeComment`,
		{},
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};

export const unlikeCommentAPI = async (commentId: string, token: string) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/comments/${commentId}/unlikeComment`,
		{},
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};

export const didUserLikeCommentAPI = async (
	commentId: string,
	token: string,
) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/comments/${commentId}/didUserAlreadyLikeComment`,
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);

	return response.data;
};

export const getCommentLikesAPI = async (commentId: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/comments/${commentId}/getCommentLikes`,
	);

	return response.data;
};

export const addNewCommentAPI = async (
	postId: string,
	newComment: string,
	token: string | undefined,
) => {
	const options = {
		method: 'post',
		url: `${process.env.REACT_APP_LOCALHOST_URL}/api/comments/${postId}/postComment`,
		data: {
			comment: newComment,
		},
		headers: {
			Authorization: JSON.parse(token!),
		},
	};

	const response = await axios(options);

	return response.data;
};

export const newRecipeComment = async (
	rating: number,
	comment: string,
	recipeId: string,
	token: string,
) => {
	const options = {
		method: 'post',
		url: `${process.env.REACT_APP_LOCALHOST_URL}/api/comments/${recipeId}/recipeComment`,
		data: {
			rating,
			comment,
		},
		headers: {
			Authorization: JSON.parse(token!),
		},
	};

	const response = await axios(options);

	return response.data;
};

export const getRecipeComments = async (id: String) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/comments/${id}/get-recipe-comments`,
	);

	return response.data;
};
