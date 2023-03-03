import app from './app.js';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;

//! CLOUD MongoDB connection
// const URL = process.env.MONGODB_CLOUD_URL.replace(
// 	'<password>',
// 	process.env.MONGODB_CLOUD_PASSWORD
// )

// mongoose
// 	.set('strictQuery', true)
// 	.connect(URL)
// 	.then(() => console.log('Connected to MongoDB  🚀🚀🚀'))
// 	.catch((err) => console.log('Could not connect to MongoDB', err))

//! Local MongoDB connection
mongoose
	.set('strictQuery', true)
	.connect(process.env.MONGODB_LOCAL_URL, {
		// useUnifiedTopology: true,
		// useNewUrlParser: true,
		// autoIndex: true,
	})
	.then(() => console.log('Connected to mongodb  🚀🚀🚀'))
	.catch((err) => console.log('Could not connect to MongoDB', err));

app.listen(port, () => console.log(`Server running on port ${port}`));
