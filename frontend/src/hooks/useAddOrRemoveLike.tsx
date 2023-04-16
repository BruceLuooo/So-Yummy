export function AddLike(data: any, postId: string) {
	const copy = [...data];

	const index = copy.findIndex(data => data._id === postId);

	if (index !== -1) {
		copy[index].likes = copy[index].likes + 1;

		return copy;
	}
	return -1;
}

export function RemoveLike(data: any, postId: string) {
	const copy = [...data];

	const index = copy.findIndex(data => data._id === postId);

	if (index !== -1) {
		copy[index].likes = copy[index].likes - 1;

		return copy;
	}
	return -1;
}
