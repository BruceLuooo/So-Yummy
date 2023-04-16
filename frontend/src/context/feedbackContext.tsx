import { createContext, useState } from 'react';
import { Feedback, FeedbackContextType } from '../types/feedbackTypes';

interface Props {
	children: React.ReactNode;
}

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export const FeedbackProvider = ({ children }: Props) => {
	const [feedback, setFeedback] = useState<Feedback[]>([]);

	const addFeedback = (newFeedback: Feedback) => {
		setFeedback([newFeedback, ...feedback]);
	};

	return (
		<FeedbackContext.Provider
			value={{
				addFeedback,
				setFeedback,
				feedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
