import { NextFunction, Request, Response } from 'express';
import { DatabaseConnection } from '../../../main/database';
import { RecrutadorEntity } from '../../shared/database/entities/RecrutadorEntity';
import jwt from 'jsonwebtoken';
import { envs } from '../../envs/envsObject';
import { IRecrutador } from '../../models/interface/IRecrutador';
import { VagaEntity } from '../../shared/database/entities/VagaEntity';
require('dotenv').config({ path: './src/app/envs/.env' });

export const validateBody = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (Object.values(req.body).some((ele) => !ele)) {
		return res.status(418).json({ message: 'Preencha todos os campos.' });
	}
	next();
};

export const validateUpdateRecrutador = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, password, nomeEmpresa, tipo } = req.body;

	if (name) {
		if (typeof name !== 'string' || name.length < 3)
			res.status(404).json({ message: 'Nome do recrutador inválido' });
	}
	if (email) {
		if (
			typeof email !== 'string' ||
			email.length < 13 ||
			email.split(' ').length > 2
		) {
			return res.status(404).json({ message: 'Email do recrutador inválido' });
		}
		if (
			(await DatabaseConnection.client.manager
				.getRepository(RecrutadorEntity)
				.findOne({ where: { email: email } })) !== null
		) {
			return res
				.status(404)
				.json({ message: 'Email do recrutador já existente' });
		}
	}
	if (password) {
		if (
			typeof password !== 'string' ||
			password.split('').length < 8 ||
			password.split(' ').length > 2
		) {
			return res
				.status(404)
				.json({ message: 'Password do recrutador inválido' });
		}
	}

	if (nomeEmpresa) {
		if (typeof nomeEmpresa !== 'string' || nomeEmpresa.length < 3) {
			return res
				.status(404)
				.json({ message: 'Nome da empresa do recrutador inválido' });
		}
	}
	if (tipo) {
		if (tipo !== 'recrutador') {
			return res.status(404).json({ message: 'Tipo do recrutador inválido' });
		}
	}
	next();
};

export const validateGetByIdRecrutador = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	if (id.length < 36) {
		return res.status(404).json({ message: 'ID inválido' });
	}
	const find = await DatabaseConnection.client.manager
		.getRepository(RecrutadorEntity)
		.findOne({ where: { uid: id } });
	if (!find) {
		return res.status(404).json({ message: 'Nenhum recrutador encontrado' });
	}
	next();
};

export const validateCreateVaga = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	const { descrição, empresa, dataLimite, status, numeroMaximoCandidatos } =
		req.body;

	const find = await DatabaseConnection.client.manager
		.getRepository(RecrutadorEntity)
		.findOne({ where: { uid: id, tipo: 'recrutador' } });
	if (!find) {
		return res
			.status(404)
			.json({ message: 'Apenas Recrutadores podem cadastrar vagas' });
	}

	if (descrição) {
		if (typeof descrição !== 'string') {
			return res.status(404).json({ message: 'Descrição inválida' });
		}
	}

	if (empresa) {
		if (typeof empresa !== 'string') {
			return res.status(404).json({ message: 'Empresa inválida' });
		}
	}

	if (dataLimite) {
		if (
			typeof dataLimite !== 'string' ||
			!dataLimite.match(
				/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g
			)
		) {
			return res.status(404).json({ message: 'Data limite inválida' });
		}
	}

	if (status) {
		if (typeof status !== 'boolean') {
			return res.status(404).json({ message: 'Status inválido' });
		}
	}

	if (numeroMaximoCandidatos) {
		if (typeof numeroMaximoCandidatos !== 'number') {
			return res
				.status(404)
				.json({ message: 'Número máximo de candidatos inválido' });
		}
	}
	next();
};

export const validateTokenRecrutador = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.headers.authorization as string;
	const secret = envs.secret as string;

	jwt.verify(authorization, secret, (error, decoded) => {
		if (Object(decoded).tipo !== 'recrutador') {
			res.status(401).json({ message: 'Apenas recrutador tem acesso' });
		}
		if (error) {
			return res.status(401).json({ message: error.message });
		}
	});

	next();
};

export const validateIdRecrutadorVaga = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, id_vaga } = req.params;
	if (
		!DatabaseConnection.client.manager
			.getRepository(VagaEntity)
			.findOne({ where: { uid: id_vaga } })
	) {
		res.status(404).json({ message: 'Vaga não encontrada' });
	}
	if (
		!DatabaseConnection.client.manager
			.getRepository(VagaEntity)
			.findOne({ where: { uid: id_vaga, uidRecrutador: id } })
	) {
		res
			.status(404)
			.json({ message: 'Só o criador da vaga pode atualiza-la ou deleta-la' });
	}
	next();
};
