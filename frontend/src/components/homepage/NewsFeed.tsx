import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	fetchMoreNewsFeed,
	getNewsFeed,
	moreNotLoggedInNewsFeed,
	notLoggedInNewsFeed,
} from '../../apis/homePages';
import PostContext from '../../context/postContext';
import { PostContextType } from '../../types/postTypes';
import SinglePost from '../posts/SinglePost';

function NewsFeed() {
	const token = Cookies.get('token');

	const { setPostInformation, postInformation } = useContext(
		PostContext,
	) as PostContextType;
	const [pageNumber, setPageNumber] = useState<number>(2);

	useEffect(() => {
		if (token !== undefined) {
			getNewsFeed(JSON.parse(token)).then(data => {
				setPostInformation({
					data: data,
					hasMore: data.length < 5 ? false : true,
				});
			});
		} else {
			notLoggedInNewsFeed().then(data => {
				setPostInformation({
					data: data,
					hasMore: data.length < 5 ? false : true,
				});
			});
		}
	}, []);

	const fetchMorePosts = () => {
		if (token !== undefined) {
			fetchMoreNewsFeed(pageNumber, JSON.parse(token!)).then(data => {
				setPostInformation({
					data: [...postInformation.data, ...data],
					hasMore: data.length < 5 ? false : true,
				});
				setPageNumber(pageNumber + 1);
			});
		} else {
			moreNotLoggedInNewsFeed(pageNumber).then(data => {
				setPostInformation({
					data: [...postInformation.data, ...data],
					hasMore: data.length < 5 ? false : true,
				});
				setPageNumber(pageNumber + 1);
			});
		}
	};

	return (
		<div className='feed-container'>
			<div>
				<InfiniteScroll
					dataLength={postInformation.data.length}
					next={fetchMorePosts}
					hasMore={postInformation.hasMore}
					loader={<div></div>}
					endMessage={<div></div>}
				>
					{postInformation.data.map((post, index) => (
						<SinglePost post={post} key={index} />
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
}

export default NewsFeed;
