import { envs } from '../app/envs/envsObject';
import { createServer } from './config/express.config';

export const runServer = () => {
	const port = envs.port;
	const api = createServer();

	api.listen(port, () => {
		console.log(`Server rodando na porta http://localhost:${port}`);
	});
};
