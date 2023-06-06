import { Request, Response } from 'express';
import { createRecrutadorService } from '../service/createRecrutadorService';
import { RepositoryAdmin } from '../repository';
import { getIdByToken } from '../../../utils/getIdByToken';

export const createRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);

		const { name, email, password, nomeEmpresa, tipo } = req.body;
		console.log(name, email, password, nomeEmpresa, tipo);
		const createRecrutador = await createRecrutadorService(
			uid,
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
