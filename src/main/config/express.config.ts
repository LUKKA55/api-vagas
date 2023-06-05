import express, { Express, Request } from 'express';
import cors from 'cors';
import { registerRoutes } from './routes.config';

export const createServer = () => {
	const api: Express = express();

	api.use(express.json(), cors());

	registerRoutes(api);

	return api;
};
