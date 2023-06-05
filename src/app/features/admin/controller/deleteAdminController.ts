import { Request, Response } from 'express';
import { deleteAdminService } from '../service/deleteAdminService';
import { RepositoryAdmin } from '../repository';

export const deleteAdminController = async (req: Request, res: Response) => {
	try {
		await deleteAdminService(req.params.id, new RepositoryAdmin());

		res.status(200).json({ message: 'Admin deletado com sucesso' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};
