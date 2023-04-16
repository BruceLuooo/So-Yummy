import axios from 'axios';

export async function getNewsFeed(token: string) {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/news-feed/current-user`,
		{
			headers: {
				Authorization: token,
			},
		},
	);

	return response.data;
}

export async function fetchMoreNewsFeed(pageNumber: number, token: string) {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/get-more-news-feed/current-user?&page=${pageNumber}`,
		{
			headers: {
				Authorization: token,
			},
		},
	);

	return response.data;
}

export async function getRecommendedProfiles(token: string) {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/recommendedProfiles/homepage`,
		{
			headers: {
				Authorization: token,
			},
		},
	);
	return response.data;
}
export async function getRandomRecommendedProfiles() {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users/recommendedRandomProfiles/homepage`,
	);
	return response.data;
}

export async function notLoggedInNewsFeed() {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/newsfeed/random`,
	);
	return response.data;
}
export async function moreNotLoggedInNewsFeed(pageNumber: number) {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/newsfeed/moreRandom?&page=${pageNumber}`,
	);
	return response.data;
}

export async function getCommunities() {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/users//topCommunities/homepage`,
	);

	return response.data;
}

export async function getRecommendedRecipes(token: string) {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/recommended-recipes/homepage`,
		{
			headers: {
				Authorization: token,
			},
		},
	);
	return response.data;
}

export async function getRandomRecommendedRecipes() {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/recipes/random-recommendedRecipes/homepage`,
	);
	return response.data;
}
