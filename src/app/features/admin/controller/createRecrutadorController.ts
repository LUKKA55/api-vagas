import { Request, Response } from 'express';
import { createRecrutadorService } from '../service/createRecrutadorService';
import { RepositoryAdmin } from '../repository';

export const createRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		const { name, email, password, nomeEmpresa, tipo } = req.body;
		console.log(name, email, password, nomeEmpresa, tipo);
		const createRecrutador = await createRecrutadorService(
			req.params.id,
			req.body,
			new RepositoryAdmin()
		);

		res.status(200).json({
			message: 'Recrutador criado com sucesso',
			data: createRecrutador,
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};
