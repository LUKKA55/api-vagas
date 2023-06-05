import { Request, Response } from 'express';
import { RepositoryAdmin } from '../repository';
import { deleteRecrutadorService } from '../service/deleteRecrutadorService';

export const deleteRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		await deleteRecrutadorService(
			req.params.idRecrutador,
			new RepositoryAdmin()
		);
		res.status(200).json({ message: 'Recrutador deletado com sucesso' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
