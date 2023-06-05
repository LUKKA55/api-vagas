import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { candidaturaService } from '../service/candidaturaService';

export const candidaturaController = async (req: Request, res: Response) => {
	try {
		await candidaturaService(
			req.params.id,
			req.params.id_vaga,
			new RepositoryCandidato()
		);
		res.status(200).json({ message: 'Candidatura feita com sucesso' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
