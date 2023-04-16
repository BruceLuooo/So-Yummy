import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import NewIngredientPopup from '../components/popup/NewIngredientPopup';
import { IngredientDetail } from '../types/ingredientListTypes';
import { getIngredientListAPI } from '../apis/ingredients';
import { filterType } from '../constants/constants';
import meat from '../assets/meats.svg';

function IngredientList() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [filter, setFilter] = useState({ type: 'Meats', image: meat });
	const [ingredientList, setIngredientList] = useState<IngredientDetail[]>([]);
	const [openIngredientModal, setOpenIngredientModal] = useState(false);

	useEffect(() => {
		try {
			getIngredientListAPI(id!, filter.type).then(data => {
				setIngredientList(data);
			});
		} catch (error) {
			console.log(error);
		}
	}, [filter, id]);

	return (
		<div className='ingredient-list-container'>
			<button
				className='w-25 border-0 bg-white px-2 text-start text-secondary'
				onClick={() => navigate(`/profile/${id}`)}
			>
				Go Back
			</button>
			<h1 className='px-2 mb-4'>Ingredients Inventory</h1>
			<div className='filter-and-ingredients'>
				<div className='add-ingredient-and-filter'>
					<Button
						className='mb-2 rounded-0'
						onClick={() => setOpenIngredientModal(true)}
					>
						Add Ingredient
					</Button>
					<Tab.Container id='ingredients-filter' defaultActiveKey='#Meats'>
						<ListGroup className='rounded-0'>
							{filterType.map((filter, index) => (
								<ListGroup.Item key={index} action href={`#${filter.type}`}>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<img
											className='ingredient-type-logo'
											src={filter.image}
											alt=''
											draggable={false}
										/>
										<span
											className='fs-4'
											onClick={() =>
												setFilter({ type: filter.type, image: filter.image })
											}
										>
											{filter.type}
										</span>
									</div>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Tab.Container>
				</div>
				<div className='w-75 pe-2'>
					<div
						style={{
							display: 'flex',
							marginBottom: '10px',
						}}
					>
						<img
							className='ingredient-type-logo'
							src={filter.image}
							alt=''
							draggable={false}
						/>
						<h2>{filter.type}</h2>
					</div>
					{ingredientList.length === 0 ? (
						<div className='border p-2 w-100'>
							<span className='fs-4'>
								You do not have any {filter.type} in your inventory
							</span>
						</div>
					) : (
						<ol>
							{ingredientList.map((ingredient, index) => (
								<li key={index} className='p-2 border'>
									<span className='fs-4'>
										{ingredient.quantity}
										{ingredient.unit} {ingredient.ingredient}
									</span>
								</li>
							))}
						</ol>
					)}
				</div>
			</div>
			{openIngredientModal && (
				<NewIngredientPopup
					openIngredientModal={openIngredientModal}
					setOpenIngredientModal={setOpenIngredientModal}
					setIngredientList={setIngredientList}
					ingredientList={ingredientList}
					filter={filter.type}
				/>
			)}
		</div>
	);
}

export default IngredientList;
