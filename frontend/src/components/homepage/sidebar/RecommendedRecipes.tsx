import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getRandomRecommendedRecipes,
	getRecommendedRecipes,
} from '../../../apis/homePages';
import LoadingPlaceHolder from '../../loading/LoadingPlaceHolder';
import avatar from '../../../assets/7.png';
import { initalRecommendedRecipes } from '../../../constants/constants';

interface Recipe {
	createdBy: string;
	images: string[];
	recipeName: string;
	_id: string;
}

function RecommendedPages() {
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState<Recipe[]>(initalRecommendedRecipes);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get('token');
		if (token === undefined) {
			getRandomRecommendedRecipes().then(data => {
				setRecipes(data);
				return setTimeout(() => {
					setLoading(false);
				}, 200);
			});
		} else {
			getRecommendedRecipes(JSON.parse(token)).then(data => {
				setRecipes(data);
				return setTimeout(() => {
					setLoading(false);
				}, 200);
			});
		}
	}, []);
	return (
		<div className='recommended-container'>
			<div className='recommended-header'>
				<span style={{ fontWeight: '600' }}>Suggested Recipes</span>
			</div>
			{loading ? (
				<div className='recommended-results'>
					{recipes.map((recipe, index) => (
						<div key={index} className='recommended'>
							<div className='relative'>
								<LoadingPlaceHolder
									extraStyles={{
										height: '100%',
										top: '0',
										left: '0',
										borderRadius: '50%',
									}}
									container
								/>
								<img
									src={avatar}
									alt='avatar'
									className='rightside-image blur'
									draggable={false}
								/>
							</div>
							<div className='recommended-name blur-gap text'>
								<span className='relative blur-width'>
									<LoadingPlaceHolder
										extraStyles={{
											height: '100%',
											top: '0',
											left: '0',
										}}
										container
									/>
									{recipe.recipeName}
								</span>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='recommended-results'>
					{recipes.map((recipe, index) => (
						<div key={index} className='recommended-recipes'>
							<div>
								<img
									src={recipe.images[0]}
									alt='avatar'
									className='leftside-image'
									draggable={false}
									onClick={() => navigate(`/recipe/${recipe._id}`)}
								/>
							</div>
							<button
								onClick={() => navigate(`/recipe/${recipe._id}`)}
								className='recommended-name text'
							>
								<span>{recipe.recipeName}</span>
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default RecommendedPages;
