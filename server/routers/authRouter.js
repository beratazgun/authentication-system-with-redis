import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import session from 'express-session';

const router = express.Router();

router.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		name: 'stsid',
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: false,
			sameSite: 'strict',
		},
	})
);

router.route('/api/v1/auth/register').post(register);
router.route('/api/v1/auth/login').post(login);
router.route('/api/v1/auth/logout').post(logout);
router.route('/api/v1/auth/getMe').get(getMe);

export default router;
