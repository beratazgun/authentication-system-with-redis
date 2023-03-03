import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT),
	},
	password: process.env.REDIS_PW,
	legacyMode: true,
});

client.on('connect', function (err) {
	if (err) {
		'Could not establish a connection with Redis. ' + err;
	} else {
		console.log('Connected to redisdb  🚀🚀🚀');
	}
});

client.connect();

export default client;
