import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarTop from './components/NavbarTop';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { FeedbackProvider } from './context/feedbackContext';
import { PostProvider } from './context/postContext';
import { ProfileProvider } from './context/profileContext';
import CreateRecipe from './pages/CreateRecipe';
import Home from './pages/Home';
import IngredientList from './pages/IngredientList';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';
import RecipeCalender from './pages/RecipeCalender';
import Register from './pages/Register';

function App() {
	return (
		<ProfileProvider>
			<PostProvider>
				<FeedbackProvider>
					<Router>
						<NavbarTop />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/login' element={<PrivateRoute />}>
								<Route path='/login' element={<Login />} />
							</Route>
							<Route path='/register' element={<PrivateRoute />}>
								<Route path='/register' element={<Register />} />
							</Route>
							<Route path='/create-new-recipe' element={<CreateRecipe />} />
							<Route path='/profile/:id' element={<Profile />} />
							<Route
								path='/profile/:id/ingredient-list'
								element={<IngredientList />}
							/>
							<Route path='/recipe/:id' element={<Recipe />} />
							<Route path='/recipe-calender' element={<RecipeCalender />} />
						</Routes>
					</Router>
				</FeedbackProvider>
			</PostProvider>
		</ProfileProvider>
	);
}

export default App;
