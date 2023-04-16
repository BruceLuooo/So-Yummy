import axios from 'axios';

const url = process.env.REACT_APP_LOCALHOST_URL;

export const createPostAPI = async (formData: FormData, token: string) => {
	const response = await axios.post(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/create`,
		formData,
		{
			headers: {
				Authorization: JSON.parse(token),
			},
		},
	);

	return response.data;
};

export const getUserPosts = async (id: string | undefined) => {
	const response = await axios.get(`${url}/api/posts/${id}`);
	return response.data;
};

export const getPostComments = async (id: string | undefined) => {
	const response = await axios.get(`${url}/api/posts/${id}/getPostComments`);
	return response.data;
};

export const moreComments = async (id: string | undefined, page: number) => {
	const response = await axios.get(
		`${url}/api/posts/${id}/getMorePostComments?&page=${page}`,
	);
	return response.data;
};

export const postLikes = async (id: string | undefined) => {
	const response = await axios.get(`${url}/api/posts/${id}/getPostLikes`);
	return response.data;
};

export const didUserLikeAPI = async (postId: string, token: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/${postId}/didUserAlreadyLike`,
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);

	return response.data;
};

export const likePostAPI = async (postId: string, token: string) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/${postId}/likePost`,
		{},
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};

export const unlikePostAPI = async (postId: string, token: string) => {
	await axios.put(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/${postId}/unlikePost`,
		{},
		{
			headers: {
				Authorization: JSON.parse(token!),
			},
		},
	);
};
