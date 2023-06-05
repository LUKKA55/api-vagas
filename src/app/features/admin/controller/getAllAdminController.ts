import { Request, Response } from 'express';
import { RepositoryAdmin } from '../repository';
import { getAllService } from '../service/getAllAdminService';

export const getAllController = async (req: Request, res: Response) => {
	try {
		const { tipo } = req.query;
		const getAll = await getAllService(tipo as string, new RepositoryAdmin());
		if (!getAll) {
			res.status(200).json({ message: `Não a nenhum ${tipo} cadastrado` });
		}
		res.status(200).json({ message: 'ok', data: getAll });
	} catch (error) {
		console.log(`ERRO get all ${error}`);
	}
};
