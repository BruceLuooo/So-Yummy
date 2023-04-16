import { useContext } from 'react';
import FeedbackContext from '../../context/feedbackContext';
import { FeedbackContextType } from '../../types/feedbackTypes';

function FeedbackStats() {
	const { feedback } = useContext(FeedbackContext) as FeedbackContextType;

	let average =
		feedback.reduce((prev, cur) => {
			return prev + cur.rating;
		}, 0) / feedback.length;

	average = parseInt(average.toFixed(1));

	return (
		<div className='feedback-stats'>
			<h4>{feedback.length} Reviews</h4>
			<h4>Average Rating: {isNaN(average) ? 0 : average}/10</h4>
		</div>
	);
}

export default FeedbackStats;
