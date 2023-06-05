import { Request, Response } from 'express';
import { getByIdService } from '../service/getByIdService';
import { RepositoryAdmin } from '../repository';

export const getByIdAdminController = async (req: Request, res: Response) => {
	try {
		const getByIdAdmin = await getByIdService(
			req.params.id,
			new RepositoryAdmin()
		);

		res.status(200).json({ message: 'Admin encontrado', data: getByIdAdmin });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};
