import client from '../client.js';
import { userSessionKey } from '../../keys.js';

export const getSession = async (sessionId) => {
	const session = await client.json.get(userSessionKey(sessionId), '.');

	if (!session) {
		return null;
	}

	return {
		...session,
	};
};

// this function will save to redis to user
export const createSession = async (user, sessionId) => {
	return await client.json.set(userSessionKey(sessionId), '.', serialize(user));
};

// this function will delete from redis to user
export const deleteSession = async (sessionId) => {
	return await client.json.del(userSessionKey(sessionId), '.');
};

const serialize = (user) => {
	return {
		...user._doc,
	};
};
