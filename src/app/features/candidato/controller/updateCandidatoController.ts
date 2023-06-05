import { Request, Response } from 'express';
import { RepositoryCandidato } from '../repository';
import { updateCandidatoService } from '../service/updateCandidatoService';

export const updateCandidatoController = async (
	req: Request,
	res: Response
) => {
	try {
		const updateCandidato = await updateCandidatoService(
			req.body,
			req.params.id,
			new RepositoryCandidato()
		);
		res
			.status(200)
			.json({
				message: 'Atualização feita com sucesso',
				data: updateCandidato,
			});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
