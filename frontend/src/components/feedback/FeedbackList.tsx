import { useContext, useEffect } from 'react';
import { FeedbackContextType } from '../../types/feedbackTypes';
import FeedbackContext from '../../context/feedbackContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeComments } from '../../apis/comments';
import { formatDistanceToNowStrict } from 'date-fns';

function FeedbackList() {
	const { feedback, setFeedback } = useContext(
		FeedbackContext,
	) as FeedbackContextType;
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		getRecipeComments(id!).then(data => {
			setFeedback(data);
		});
	}, []);

	if (!feedback || feedback.length === 0) {
		return <p> No Reviews Yet </p>;
	}

	return (
		<div className='feedback-list'>
			{feedback.map((item, index) => (
				<div className='card' key={index}>
					<div className='num-display'>{item.rating}</div>
					<div className='single-post-userinfo'>
						<button
							className='go-to-profile-button'
							onClick={() => navigate(`/profile/${item.createdBy._id}`)}
						>
							<img
								className='small-profile-image'
								src={item.createdBy.avatar}
								alt='avatar'
								draggable={false}
							/>
						</button>
						<div className='single-post-user'>
							<button
								className='go-to-profile-button'
								onClick={() => navigate(`/profile/${item.createdBy._id}`)}
							>
								{item.createdBy.name}
							</button>
							<div className='single-post-date'>
								<span>{item.createdBy.title}</span>
								<div className='save-recipe'>
									<span>{formatDistanceToNowStrict(new Date(item.date))}</span>
								</div>
							</div>
						</div>
					</div>
					<div>{item.comment}</div>
				</div>
			))}
		</div>
	);
}

export default FeedbackList;
