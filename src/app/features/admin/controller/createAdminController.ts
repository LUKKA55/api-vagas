import { Request, Response } from 'express';
import { createAdminService } from '../service/createAdminService';
import { RepositoryAdmin } from '../repository';

export const createAdminController = async (req: Request, res: Response) => {
	try {
		const createAdmin = await createAdminService(
			req.body,
			new RepositoryAdmin()
		);

		res
			.status(200)
			.json({ message: 'Admin criado com sucesso', data: createAdmin });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};
