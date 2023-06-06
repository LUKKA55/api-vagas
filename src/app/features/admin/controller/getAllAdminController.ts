import { Request, Response } from 'express';
import { RepositoryAdmin } from '../repository';
import { getAllService } from '../service/getAllAdminService';
import { validateTipo } from '../middlewares';

export const getAllController = async (req: Request, res: Response) => {
	try {
		const { tipo } = req.query;

		validateTipo(tipo as string);

		const getAll = await getAllService(tipo as string, new RepositoryAdmin());

		if (!getAll?.length) {
			res.status(200).json({ message: `Não a nenhum ${tipo} cadastrado` });
		}
		res.status(200).json({ message: 'ok', data: getAll });
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};
