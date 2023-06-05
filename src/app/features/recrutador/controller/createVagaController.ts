import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { createVagaService } from '../service/createVagaService';

export const createVagaController = async (req: Request, res: Response) => {
	try {
		const createVaga = await createVagaService(
			req.params.id,
			req.body,
			new RepositoryRecrutador()
		);
		res
			.status(200)
			.json({ message: 'Vaga criada com sucesso', data: createVaga });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
