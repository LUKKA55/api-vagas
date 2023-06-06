import { Request, Response } from 'express';
import { RepositoryRecrutador } from '../repository';
import { getAllVagaByRecrutadorService } from '../service/getAllVagaByRecrutadorService';
import { getIdByToken } from '../../../utils/getIdByToken';

export const getAllVagaByRecrutadorController = async (
	req: Request,
	res: Response
) => {
	try {
		const uid = getIdByToken(req.headers.authorization as string);

		const getAllVaga = await getAllVagaByRecrutadorService(
			uid,
			new RepositoryRecrutador()
		);
		if (!getAllVaga.length) {
			res.status(200).json({ message: 'Você ainda não criou nenhuma vaga' });
		}
		res.status(200).json({ message: 'Suas vagas cridas', data: getAllVaga });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
