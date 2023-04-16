import { createContext, useState } from 'react';
import { Post, PostContextType } from '../types/postTypes';

interface Props {
	children: React.ReactNode;
}

const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: Props) => {
	const [postInformation, setPostInformation] = useState<Post>({
		data: [],
		hasMore: true,
	});

	return (
		<PostContext.Provider value={{ setPostInformation, postInformation }}>
			{children}
		</PostContext.Provider>
	);
};

export default PostContext;
