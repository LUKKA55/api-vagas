import { Request, Response } from 'express';
import { RepositoryAdmin } from '../repository';
import { loginAdminService } from '../service/loginAdminService';

export const loginAdminController = async (req: Request, res: Response) => {
	try {
		const { name, password, email } = req.body;
		const loginAdmin = await loginAdminService(
			name,
			email,
			password,
			new RepositoryAdmin()
		);
		res
			.status(200)
			.json({ message: 'Login feito com sucesso', token: loginAdmin });
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({ message: error.message });
		}
	}
};
