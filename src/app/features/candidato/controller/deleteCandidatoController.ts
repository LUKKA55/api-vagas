import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { deleteCandidatoService } from '../service/deleteCandidatoService';
import { getIdByToken } from '../../../utils/getIdByToken';

export const deleteCandidatoController = async (
	req: Request,
	res: Response
) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);
		await deleteCandidatoService(uid, new RepositoryCandidato());
		res.status(200).json({ message: 'Candidato deletado com sucesso' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
