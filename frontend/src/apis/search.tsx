import axios from 'axios';

export async function getSearchResults(searchQuery: string) {
	const response = await axios.get(
		`${process.env.REACT_APP_LOCALHOST_URL}/api/search?&search=${searchQuery}`,
	);

	return response.data;
}
