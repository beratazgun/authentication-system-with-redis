import { randomBytes } from 'crypto';

const generateId = () => {
	return randomBytes(32).toString('hex');
};

export default generateId;
