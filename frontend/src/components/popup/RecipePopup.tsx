import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RecipeType } from '../../types/recipeTypes';
import { useNavigate } from 'react-router-dom';

type Props = {
	recipeModal: boolean;
	setRecipeModal: Function;
	recipeInformation: RecipeType;
};

function CreateNewPost({
	recipeModal,
	setRecipeModal,
	recipeInformation,
}: Props) {
	const navigate = useNavigate();

	return (
		<Modal
			show={recipeModal}
			animation={false}
			size='lg'
			onHide={() => setRecipeModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Create New Post</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='col-8 border-start ps-2 d-flex flex-column'>
					<div className='fs-3 my-3'>{recipeInformation.recipeName}</div>
					<button
						className='text-start border-0 ps-0 bg-white text-secondary text-decoration-underline'
						onClick={() =>
							navigate(`/profile/${recipeInformation.createdBy._id}`)
						}
					>
						{recipeInformation.createdBy.name}
					</button>
					<div className='d-flex flex-column gap-2'>
						<div className='d-flex w-100 mt-3 '>
							<div className='p-2 border-start border-end'>
								Prep: {recipeInformation.prepTime} minutes
							</div>
							<div className='p-2 x'>
								Cook: {recipeInformation.cookTime} minutes
							</div>
							<div className='p-2 border-start border-end'>
								Servings: {recipeInformation.servings}
							</div>
						</div>
						<div className='mt-3 d-flex flex-column'>
							<span className='mb-2'>Ingredients:</span>
							<ol>
								{recipeInformation.ingredients.map((ingredient, index) => (
									<li key={index}>
										{ingredient.quantity}
										{ingredient.unit} {ingredient.ingredient}
									</li>
								))}
							</ol>
						</div>
						<div className='mt-3 d-flex flex-column'>
							<span className='mb-2'>Instructions:</span>
							<ol>
								{recipeInformation.instructions.map((instruction, index) => (
									<li key={index}>{instruction.instruction}</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => setRecipeModal(false)}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateNewPost;
