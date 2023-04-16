import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './src/config/db';
const PORT = process.env.PORT || 8000;
import userRoutes from './src/routes/userRoutes';
import postRoutes from './src/routes/postRoutes';
import commentRoutes from './src/routes/commentRoutes';
import recipeRoutes from './src/routes/recipeRoutes';
import calenderRoutes from './src/routes/calenderRoutes';
import searchRoutes from './src/routes/searchRoutes';
import cron from 'node-cron';
import Calender from './src/models/calenderModel';
import path from 'path';

const app = express();
connectDB();

// This is for every 10 second, delete this after youre done testing
// cron.schedule('*/10 * * * * *', async () => {
// 	const date = new Date();
// 	await Calender.updateMany(
// 		{ completed: false, date: { $lt: date } },
// 		{
// 			$set: {
// 				completed: true,
// 			},
// 		},
// 	);
// });
cron.schedule('50 23 * * *', async () => {
	const date = new Date();
	await Calender.updateMany(
		{ completed: false, date: { $lt: date } },
		{
			$set: {
				completed: true,
			},
		},
	);
});

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/calenders', calenderRoutes);
app.use('/api/search', searchRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get('*', (req: Request, res: Response) =>
	res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')),
);

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${process.env.PORT}`);
});
