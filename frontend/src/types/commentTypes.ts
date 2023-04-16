export interface CommentsData {
	date: Date;
	_id: string;
	comment: string;
	author: {
		_id: string;
		name: string;
		avatar: string;
	};
	likes: number;
}
