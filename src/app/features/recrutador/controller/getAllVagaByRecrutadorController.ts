import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { getAllVagaByRecrutadorService } from '../service/getAllVagaByRecrutadorService';

export const getAllVagaByRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		const getAllVaga = await getAllVagaByRecrutadorService(
			req.params.id,
			new RepositoryRecrutador()
		);
		res.status(200).json({ message: 'Suas vagas cridas', data: getAllVaga });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
