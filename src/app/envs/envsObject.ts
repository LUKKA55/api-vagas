import 'dotenv/config';

export const envs = {
	dbUrl: process.env.DATABASE_URL,
	port: process.env.PORT,
	secret: process.env.JWT_KEY,
};
