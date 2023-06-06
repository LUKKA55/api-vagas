import { Request, Response } from 'express';
import { getByIdService } from '../service/getByIdService';
import { RepositoryAdmin } from '../repository';
import { getIdByToken } from '../../../utils/getIdByToken';

export const getByIdAdminController = async (req: Request, res: Response) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);
		const getByIdAdmin = await getByIdService(uid, new RepositoryAdmin());

		res.status(200).json({ message: 'Admin encontrado', data: getByIdAdmin });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};
