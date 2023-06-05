import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { deleteVagaService } from '../service/deleteVagaService';

export const deleteVagaController = async (req: Request, res: Response) => {
	try {
		const deleteVaga = await deleteVagaService(
			req.params.id_vaga,
			new RepositoryRecrutador()
		);
		res.status(200).json({ message: 'Vaga deletada com sucesso' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
