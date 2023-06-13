import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { getVagaByIdService } from '../service/getVagaByIdService';

export const getVagaByIdController = async (req: Request, res: Response) => {
	try {
		const getVaga = await getVagaByIdService(
			req.params.id_vaga,
			new RepositoryCandidato()
		);
		return res.status(200).json({ data: getVaga });
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
};
