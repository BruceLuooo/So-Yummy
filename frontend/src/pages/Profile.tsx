import { useContext, useEffect, useState } from 'react';
import SinglePost from '../components/posts/SinglePost';
import RecipePost from '../components/recipes/RecipePost';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileAbout from '../components/profile/ProfileAbout';
import CreatePost from '../components/posts/CreatePost';
import PostContext from '../context/postContext';
import { PostContextType } from '../types/postTypes';
import Cookies from 'js-cookie';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUserPosts } from '../apis/Posts';
import { getRecipes, getSavedRecipes } from '../apis/recipes';
import { RecipePostType } from '../types/recipeTypes';
import plusIcon from '../assets/plusCircle.svg';
import whitePlusIcon from '../assets/whitePlus.png';
import RecommendedPages from '../components/homepage/sidebar/RecommendedPages';
import SuggestedPeople from '../components/homepage/sidebar/SuggestedPeople';
import RecommendedRecipes from '../components/homepage/sidebar/RecommendedRecipes';

function Profile() {
	const { setPostInformation, postInformation } = useContext(
		PostContext,
	) as PostContextType;
	const { id } = useParams();
	const userId = Cookies.get('userId');
	const navigate = useNavigate();

	const [filter, setFilter] = useState<string>('posts');
	const [recipeFilter, setRecipeFilter] = useState('Recipes');
	const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
	const [pageNumber, setPageNumber] = useState<number>(2);
	const [recipes, setRecipes] = useState<RecipePostType[]>([]);
	const [popup, setPopup] = useState(false);

	useEffect(() => {
		const handleEvent = () => {
			setPopup(false);
		};

		window.addEventListener('click', handleEvent);
	}, []);

	useEffect(() => {
		getUserPosts(id).then(data => {
			setPostInformation({
				data: data.posts,
				hasMore: data.posts.length < 3 ? false : true,
			});
		});
		setFilter('posts');
		setPageNumber(2);
	}, [id]);

	useEffect(() => {
		if (userId !== undefined && JSON.parse(userId) === id) {
			setUserLoggedIn(true);
		} else {
			setUserLoggedIn(false);
		}
	}, [id]);

	useEffect(() => {
		getRecipes(id).then(data => {
			setRecipes(data);
		});
		setRecipeFilter('Recipes');
	}, [id]);

	const fetchMorePosts = async () => {
		await axios
			.get(
				`${process.env.REACT_APP_LOCALHOST_URL}/api/posts/${id}/getMoreUsersPost?&page=${pageNumber}`,
			)
			.then(({ data }) => {
				setPostInformation({
					data: [...postInformation.data, ...data],
					hasMore: postInformation.data.length < 3 ? false : true,
				});
				setPageNumber(pageNumber + 1);
			});
	};

	const getUserSavedRecipes = async () => {
		try {
			getSavedRecipes(id).then(data => {
				setRecipes(data);
				setRecipeFilter('Saved Recipes');
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getUserRecipes = async () => {
		try {
			getRecipes(id).then(data => {
				setRecipes(data);
				setRecipeFilter('Recipes');
			});
		} catch (error) {
			console.log('could not get recipes by user');
		}
	};

	const openPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setPopup(true);
	};

	return (
		<div className='homepage-container'>
			<div className='homepage-layout empty'>
				<RecommendedRecipes />
			</div>
			<div className='profile-container main'>
				<ProfileAbout />
				{userLoggedIn && <CreatePost />}
				<div className='profile-user-posts'>
					<div>
						<button
							className={`profile-user-posts-filter ${
								filter === 'posts' && 'filter-selected'
							}`}
							onClick={() => setFilter('posts')}
						>
							Posts
						</button>
						<button
							className={`profile-user-posts-filter ${
								filter === 'recipes' && 'filter-selected'
							}`}
							onClick={() => setFilter('recipes')}
						>
							Recipes
						</button>
					</div>

					{filter === 'posts' ? (
						<div>
							<InfiniteScroll
								dataLength={postInformation.data.length}
								next={fetchMorePosts}
								hasMore={postInformation.hasMore}
								loader={<div></div>}
								endMessage={<div></div>}
							>
								{postInformation.data.map((post, index) => (
									<SinglePost post={post} key={index + 10} />
								))}
							</InfiniteScroll>
						</div>
					) : (
						<div>
							<div className='recipe-filter'>
								<Nav className='me-auto'>
									<NavDropdown title={recipeFilter} id='basic-nav-dropdown'>
										<NavDropdown.Item
											href='#my-recipes'
											onClick={getUserRecipes}
										>
											Recipes
										</NavDropdown.Item>
										<NavDropdown.Item
											href='#saved-recipes'
											onClick={getUserSavedRecipes}
										>
											Saved Recipies
										</NavDropdown.Item>
									</NavDropdown>
								</Nav>
								{userLoggedIn && (
									<div className='recipe-popup-container'>
										<button className='interaction' onClick={openPopup}>
											<img
												src={plusIcon}
												alt=''
												className='plus-icon'
												draggable={false}
											/>
										</button>
										{popup && (
											<div className='recipe-popup'>
												<div>
													<Button
														className='w-100 d-flex align-items-center justify-content-center gap-1'
														onClick={() => navigate('/create-new-recipe')}
													>
														<img
															className='white-plus-icon'
															src={whitePlusIcon}
															alt=''
															draggable={false}
														/>
														<span>Create Recipe</span>
													</Button>
												</div>
												<div>
													<Button
														className='w-100'
														onClick={() =>
															navigate(`/profile/${id}/ingredient-list`)
														}
													>
														Ingredients Inventory
													</Button>
												</div>
											</div>
										)}
									</div>
								)}
							</div>
							{recipes.map((recipe, index) => (
								<RecipePost recipe={recipe} key={index} />
							))}
						</div>
					)}
				</div>
			</div>
			<div className='homepage-layout side-bar'>
				<RecommendedPages />
				<SuggestedPeople />
			</div>
		</div>
	);
}

export default Profile;
