export type FeedbackContextType = {
	addFeedback: (newFeedback: Feedback) => void;
	setFeedback: React.Dispatch<React.SetStateAction<Feedback[]>>;
	feedback: Feedback[];
};

export interface Feedback {
	_id: string;
	comment: string;
	recipeId: string;
	rating: number;
	createdBy: {
		_id: string;
		avatar: string;
		name: string;
		title: string;
	};
	date: Date;
}
