export const recipeInitalState = {
	_id: '',
	createdBy: {
		name: '',
		_id: '',
	},
	recipeName: '',
	description: '',
	cookTime: 0,
	prepTime: 0,
	servings: 0,
	ingredients: [],
	instructions: [],
	images: [],
	loading: true,
};

export const createRecipeInitalState = {
	recipeName: '',
	description: '',
	prep: '',
	cook: '',
	serve: 0,
	instructions: [{ id: 1, instruction: '' }],
	ingredients: [{ id: 1, ingredient: '', type: '', quantity: 0, unit: '' }],
	image: [],
};

export interface RecipeType {
	_id: string;
	createdBy: {
		name: string;
		_id: string;
	};
	recipeName: string;
	description: string;
	cookTime: number | undefined;
	prepTime: number | undefined;
	servings: number | undefined;
	ingredients: {
		ingredient: string;
		quantity: number | undefined;
		unit: string;
	}[];
	instructions: {
		instruction: string;
	}[];
	images: string[];
	loading: boolean;
}

export interface RecipePostType {
	name: string;
	title: string;
	recipeName: string;
	recipeId: string;
	avatar: string;
	images: string[];
}

export interface CreateRecipeType {
	recipeName: string;
	description?: string;
	prep: string;
	cook: string;
	serve: number;
	instructions: {
		id: number;
		instruction: string;
	}[];
	ingredients: {
		id: number;
		ingredient: string;
		type: string;
		quantity: number;
		unit: string;
	}[];
	image: string[];
}
