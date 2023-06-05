import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { loginCandidatoService } from '../service/loginCandidatoService';

export const loginCandidatoController = async (req: Request, res: Response) => {
	try {
		const { name, password, email } = req.body;
		const loginCandidato = await loginCandidatoService(
			name,
			email,
			password,
			new RepositoryCandidato()
		);
		res
			.status(200)
			.json({ message: 'Login feito com sucesso', token: loginCandidato });
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({ message: error.message });
		}
	}
};
