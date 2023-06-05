import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { getAllRecrutadorService } from '../service/getAllRecrutadorService';

export const getAllRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		const getAllRecrutador = await getAllRecrutadorService(
			new RepositoryRecrutador()
		);

		res.status(200).json({
			message: 'Todos os Recrutadores cadastrados',
			data: getAllRecrutador,
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
