import { Request, Response } from 'express';
import { updateRecrutadorService } from '../service/updateRecrutadorService';
import { RepositoryRecrutador } from '../repository';

export const updateRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		const updateRecrutador = await updateRecrutadorService(
			req.body,
			req.params.id,
			new RepositoryRecrutador()
		);
		res
			.status(200)
			.json({
				message: 'Recrutador atualizado com sucesso',
				data: updateRecrutador,
			});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
