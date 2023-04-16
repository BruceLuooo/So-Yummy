import Cookies from 'js-cookie';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { newRecipeComment } from '../../apis/comments';
import FeedbackContext from '../../context/feedbackContext';
// import RatingSelect from "./RatingSelect"
import { FeedbackContextType } from '../../types/feedbackTypes';
import RatingSelect from './RatingSelect';

function FeedbackForm() {
	const { addFeedback } = useContext(FeedbackContext) as FeedbackContextType;
	const { id } = useParams();
	const token = Cookies.get('token');
	const [text, setText] = useState('');
	const [rating, setRating] = useState(10);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		newRecipeComment(rating, text, id!, token!).then(data => {
			console.log(data);
			addFeedback(data);
			setText('');
			setRating(10);
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2
				style={{
					textAlign: 'center',
					textDecoration: 'underline',
					textUnderlineOffset: '8px',
				}}
			>
				Rate This Recipe
			</h2>
			<RatingSelect select={setRating} selected={rating} />
			<div className='input-group'>
				<input
					name='bruce'
					onChange={handleTextChange}
					type='text'
					placeholder='Enter Here'
					value={text}
				/>
				<button type='submit' disabled={text.length <= 0 ? true : false}>
					Submit
				</button>
			</div>
		</form>
	);
}

export default FeedbackForm;
