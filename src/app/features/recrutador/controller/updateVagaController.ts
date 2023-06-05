import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { updateVagaService } from '../service/updateVagaService';

export const updateVagaController = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const updateVaga = await updateVagaService(
			req.body,
			req.params.id_vaga,
			new RepositoryRecrutador()
		);
		res
			.status(200)
			.json({ message: 'Vaga atualizada com sucesso', data: updateVaga });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
