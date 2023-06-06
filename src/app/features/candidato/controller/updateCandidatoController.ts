import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { updateCandidatoService } from '../service/updateCandidatoService';
import { getIdByToken } from '../../../utils/getIdByToken';

export const updateCandidatoController = async (
	req: Request,
	res: Response
) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);
		const updateCandidato = await updateCandidatoService(
			req.body,
			uid,
			new RepositoryCandidato()
		);
		res.status(200).json({
			message: 'Atualização feita com sucesso',
			data: updateCandidato,
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
