import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { updateVagaService } from '../service/updateVagaService';
import { getIdByToken } from '../../../utils/getIdByToken';

export const updateVagaController = async (req: Request, res: Response) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);
		const updateVaga = await updateVagaService(
			uid,
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
