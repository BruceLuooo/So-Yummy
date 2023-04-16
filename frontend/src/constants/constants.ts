import fruits from '../assets/fruits.svg';
import meats from '../assets/meats.svg';
import vegetables from '../assets/vegetables.svg';
import dairy from '../assets/dairy.svg';
import carbs from '../assets/carbs.svg';
import spices from '../assets/spices.svg';
import liquids from '../assets/liquids.svg';

export const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const years = ['2023', '2024', '2025', '2026', '2027', '2028'];

export const defaultDate = {
	month: '',
	day: '',
	year: '2023',
};

export const filterType = [
	{ type: 'Meats', image: meats },
	{ type: 'Vegetables', image: vegetables },
	{ type: 'Fruits', image: fruits },
	{ type: 'Dairy', image: dairy },
	{ type: 'Carbs', image: carbs },
	{ type: 'Spices', image: spices },
	{ type: 'Liquids', image: liquids },
];

export const initalRecommendedRecipes = [
	{ images: [''], createdBy: '', recipeName: 'placeholder text', _id: '' },
	{ images: [''], createdBy: '', recipeName: 'placeholder text', _id: '' },
	{ images: [''], createdBy: '', recipeName: 'placeholder text', _id: '' },
	{ images: [''], createdBy: '', recipeName: 'placeholder text', _id: '' },
	{ images: [''], createdBy: '', recipeName: 'placeholder text', _id: '' },
];
