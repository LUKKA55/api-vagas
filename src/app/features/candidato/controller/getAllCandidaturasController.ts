import { Request, Response } from 'express';
import { getIdByToken } from '../../../utils/getIdByToken';
import { RepositoryCandidato } from '../repository';
import { getAllCandidaturasService } from '../service/getAllCandidaturasService';

export const getAllCandidaturasController = async (
	req: Request,
	res: Response
) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);
		const getAllCandidaturas = await getAllCandidaturasService(
			uid,
			new RepositoryCandidato()
		);
		if (!getAllCandidaturas.length) {
			return res
				.status(200)
				.json({ message: 'Você ainda não possui candidaturas' });
		}
		res
			.status(200)
			.json({ message: 'Suas candidaturas a vagas', data: getAllCandidaturas });
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
};
