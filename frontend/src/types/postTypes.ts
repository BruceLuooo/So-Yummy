export interface PostInformation {
	likes: number;
	comments: number;
	date: Date;
	_id: string;
	authorId: {
		_id: string;
		title: string;
		avatar: string;
	};
	description: string;
	authorName: string;
	images: string[];
}

export interface Post {
	data: PostInformation[];
	hasMore: boolean;
}

export type PostContextType = {
	setPostInformation: React.Dispatch<React.SetStateAction<Post>>;
	postInformation: Post;
};
