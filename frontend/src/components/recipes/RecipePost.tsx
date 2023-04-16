import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AddToCalenderPopup from '../popup/AddToCalenderPopup';
import Cookies from 'js-cookie';
import {
	recipeInitalState,
	RecipePostType,
	RecipeType,
} from '../../types/recipeTypes';
import { getSingleRecipeAPI } from '../../apis/recipes';

type Props = {
	recipe: RecipePostType;
};

function RecipePost({ recipe }: Props) {
	const token = Cookies.get('userId');
	const { id } = useParams();
	const navigate = useNavigate();

	const [openModal, setOpenModal] = useState(false);
	const [signedIn, setSignedIn] = useState<boolean>(false);
	const [recipeInformation, setRecipeInformation] =
		useState<RecipeType>(recipeInitalState);

	useEffect(() => {
		if (token === undefined || JSON.parse(token!) !== id) {
			setSignedIn(false);
		} else {
			setSignedIn(true);
		}
	}, [id]);

	const goToRecipe = () => {
		navigate(`/recipe/${recipe.recipeId}`);
	};

	const addRecipeToCalender = async () => {
		getSingleRecipeAPI(recipe.recipeId).then(data => {
			setRecipeInformation(data);
			setOpenModal(true);
		});
	};

	return (
		<div className='single-post-container recipe-post'>
			<div>
				<div className='single-post-userinfo'>
					<div>
						<img src={recipe.avatar} alt='avatar' draggable={false} />
					</div>
					<div className='single-post-user'>
						<span>{recipe.name}</span>
						<div className='single-post-date'>
							<span>{recipe.title}</span>
						</div>
					</div>
				</div>
				<div className='d-flex gap-2 align-items-center'>
					<img
						onClick={goToRecipe}
						className='recipe-image recipe'
						src={recipe.images[0]}
						alt=''
						draggable={false}
					/>
					<div>
						<div>
							<button className='interaction' onClick={goToRecipe}>
								<h5>{recipe.recipeName}</h5>
							</button>
						</div>
						{signedIn && (
							<Button className='btn-sm' onClick={addRecipeToCalender}>
								Add Recipe To Calender
							</Button>
						)}
					</div>
				</div>
			</div>

			{openModal && (
				<AddToCalenderPopup
					recipeId={recipe.recipeId}
					setOpenModal={setOpenModal}
					openModal={openModal}
					recipeInformation={recipeInformation}
				/>
			)}
		</div>
	);
}

export default RecipePost;
