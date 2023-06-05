import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { getAllVagasService } from '../service/getAllVagasService';

export const getAllVagasController = async (_: Request, res: Response) => {
	try {
		const getAllVagas = await getAllVagasService(new RepositoryCandidato());
		if (getAllVagas.length > 0) {
			res.status(200).json({ vagas: getAllVagas });
		}
		res.status(200).json({ message: 'Não a vagas ativas' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
