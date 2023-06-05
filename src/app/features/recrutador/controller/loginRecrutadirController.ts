import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { loginRecrutadorService } from '../service/loginRecrutadorService';

export const loginRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		const { name, email, password } = req.body;
		const loginRecrutador = await loginRecrutadorService(
			name,
			email,
			password,
			new RepositoryRecrutador()
		);
		res
			.status(200)
			.json({ message: 'Login feito com sucesso', token: loginRecrutador });
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({ message: error.message });
		}
	}
};
