import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { candidaturaService } from '../service/candidaturaService';
import { getIdByToken } from '../../../utils/getIdByToken';

export const candidaturaController = async (req: Request, res: Response) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);

		const candidatura = await candidaturaService(
			uid,
			req.params.id_vaga,
			new RepositoryCandidato()
		);
		res.status(200).json({
			message: `Candidatura feita com sucesso para a vaga de ${candidatura?.getDescricao}`,
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
