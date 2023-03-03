import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import RedisStore from 'connect-redis';
import client from './services/redis/client.js';
import cors from 'cors';
import lodash from 'lodash';

import HandleError from './utils/HandleError.js';
import authRouter from './routers/authRouter.js';
import errorController from './controllers/errorController.js';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(
	cors({
		credentials: true, // This is important.
		origin: ['http://localhost:5173'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);

// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: true,
// 		name: 'stsid',
// 		cookie: {
// 			maxAge: 1000 * 60 * 60 * 24 * 7,
// 			httpOnly: false,
// 			sameSite: 'strict',
// 		},
// 	})
// );

app.use((req, res, next) => {
	console.log('sessionId -->', req.sessionID);

	next();
});

// Routers
app.use(authRouter);

// İf route is not defined, this middleware will be executed.
app.all('*', (req, res, next) => {
	next(new HandleError('This route is not defined. Please chech URL.', 404, false));
});

app.use(errorController);

export default app;
