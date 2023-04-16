import CreatePost from '../components/posts/CreatePost';
import NewsFeed from '../components/homepage/NewsFeed';
import RecommendedPages from '../components/homepage/sidebar/RecommendedPages';
import SuggestedPeople from '../components/homepage/sidebar/SuggestedPeople';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { getUserInfo } from '../apis/user';
import ProfileContext from '../context/profileContext';
import { ProfileContextType } from '../types/profileTypes';
import RecommendedRecipes from '../components/homepage/sidebar/RecommendedRecipes';

function Home() {
	const { addProfile } = useContext(ProfileContext) as ProfileContextType;
	const userId = Cookies.get('userId');

	useEffect(() => {
		if (userId !== undefined) {
			getUserInfo(JSON.parse(userId!)).then(data => {
				addProfile(data);
			});
		}
	}, []);

	return (
		<div className='homepage-container'>
			<div className='homepage-layout empty'>
				<RecommendedRecipes />
			</div>
			<div className='homepage-layout main'>
				{userId && <CreatePost />}
				<NewsFeed />
			</div>
			<div className='homepage-layout side-bar'>
				<RecommendedPages />
				<SuggestedPeople />
			</div>
		</div>
	);
}

export default Home;
