import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { deleteCandidatoService } from '../service/deleteCandidatoService';

export const deleteCandidatoController = async (
	req: Request,
	res: Response
) => {
	try {
		const deleteCandidato = await deleteCandidatoService(
			req.params.id,
			new RepositoryCandidato()
		);
		res.status(200).json({ message: 'Candidato deletado com sucesso' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
