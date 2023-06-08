import 'dotenv/config';

export const envs = {
	dbUrl: process.env.DATABASE_URL,
	port: process.env.PORT,
	secret: process.env.JWT_KEY,
	host_redis: process.env.HOST_REDIS as string,
	password_redis: process.env.PASSWORD_REDIS as string,
	port_redis: Number(process.env.PORT_REDIS),
};
