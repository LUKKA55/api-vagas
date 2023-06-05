import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { createCandidatoService } from '../service/createCandidatoService';

export const createCandidatoController = async (
	req: Request,
	res: Response
) => {
	try {
		const createCandidato = await createCandidatoService(
			req.body,
			new RepositoryCandidato()
		);
		res
			.status(200)
			.json({ message: 'Candidato criado com sucesso', data: createCandidato });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
