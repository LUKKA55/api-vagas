import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { createVagaService } from '../service/createVagaService';
import { getIdByToken } from '../../../utils/getIdByToken';

export const createVagaController = async (req: Request, res: Response) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);

		const createVaga = await createVagaService(
			uid,
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
