import { Request, Response } from 'express';
import { updateAdminService } from '../service/updateAdminService';
import { RepositoryAdmin } from '../repository';

export const updateAdminController = async (req: Request, res: Response) => {
	try {
		const updateAdmin = await updateAdminService(
			req.body,
			req.params.id,
			new RepositoryAdmin()
		);
		res
			.status(200)
			.json({ message: 'Admin atualizado com sucesso', data: updateAdmin });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};
