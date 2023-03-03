import Auth from '../models/authModel.js';
import CatchBlock from '../utils/CatchBlock.js';
import HandleError from '../utils/HandleError.js';
import { createSession, deleteSession, getSession } from '../services/redis/queries/session.js';

export const register = CatchBlock(async (req, res, next) => {
	const { firstName, lastName, email, phoneNumber, password, passwordConfirm } = req.body;

	await Auth.create({ firstName, lastName, email, phoneNumber, password, passwordConfirm });

	res.status(200).json({
		statusCode: 200,
		isSuccess: true,
	});
});

export const login = CatchBlock(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new HandleError('Please enter a email and password', 400, false));
	}

	let user = await Auth.findOne({ email }).select('+password');

	if (!user || !(await user.isCorrectPassword(password, user.password))) {
		return next(new HandleError('Password or/and email is wrong.', 401, false));
	}

	createSession(user, req.sessionID);

	res.status(200).json({
		statusCode: 200,
		isSuccess: true,
	});

	console.log('login', req.sessionID);
});

export const logout = CatchBlock(async (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			return next(new HandleError('Something went wrong.', 500, false));
		}

		res.clearCookie('stsid');

		res.status(200).json({
			statusCode: 200,
			isSuccess: true,
		});
	});

	deleteSession(req.sessionID);

	console.log('logout', req.sessionID);
});

export const getMe = CatchBlock(async (req, res, next) => {
	const data = await getSession(req.sessionID);

	res.status(200).json({
		statusCode: 200,
		isSuccess: true,
		data: data ? data : null,
	});
	console.log('getMe', req.sessionID);
});
