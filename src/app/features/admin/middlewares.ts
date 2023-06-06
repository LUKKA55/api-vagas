import { NextFunction, Request, Response } from 'express';
import { DatabaseConnection } from '../../../main/database';
import { AdminEntity } from '../../shared/database/entities/AdminEntity';
import { RecrutadorEntity } from '../../shared/database/entities/RecrutadorEntity';
import jwt from 'jsonwebtoken';
import { envs } from '../../envs/envsObject';
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

export const validateCreateAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, password, tipo } = req.body;
	if (name) {
		if (typeof name !== 'string') {
			return res.status(404).json({ message: 'Nome inválido' });
		}
	}
	if (email) {
		if (typeof email !== 'string' || email.split(' ').length > 2) {
			return res.status(404).json({ message: 'Email inválido' });
		}
		if (
			(await DatabaseConnection.client.manager
				.getRepository(AdminEntity)
				.findOne({ where: { email: email } })) !== null
		) {
			return res.status(404).json({ message: 'Email já existente' });
		}
	}
	if (password) {
		if (
			typeof password !== 'string' ||
			password.split('').length < 8 ||
			password.split(' ').length > 2
		) {
			return res.status(404).json({ message: 'Password inválido' });
		}
	}
	if (tipo) {
		if (tipo !== 'admin') {
			return res.status(404).json({ message: 'Tipo inválido' });
		}
	}
	next();
};

export const validateGetByIdAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	if (id.length < 36) {
		return res.status(404).json({ message: 'ID inválido' });
	}
	const find = await DatabaseConnection.client.manager
		.getRepository(AdminEntity)
		.findOne({ where: { uid: id } });
	if (!find) {
		return res.status(404).json({ message: 'Nenhum Admin encontrado' });
	}
	next();
};

export const validateCreateRecrutador = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, password, nomeEmpresa, tipo } = req.body;

	if (name) {
		if (typeof name !== 'string')
			res.status(404).json({ message: 'Nome do recrutador inválido' });
	}
	if (email) {
		if (typeof email !== 'string' || email.split(' ').length > 2) {
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
		if (typeof nomeEmpresa !== 'string') {
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

export const validateDeleteRecrutador = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { idRecrutador } = req.params;

	const findRecrutador = await DatabaseConnection.client.manager
		.getRepository(RecrutadorEntity)
		.findOne({ where: { uid: idRecrutador } });
	if (!findRecrutador) {
		return res.status(404).json({ message: 'Nenhumm recrutador encontrado' });
	}
	next();
};

export const validateTipo = (tipo: string) => {
	if (
		tipo !== 'admin' &&
		tipo !== 'recrutador' &&
		tipo !== 'candidato' &&
		tipo !== undefined
	) {
		throw Error('Tipo inválido');
	}
};

export const validateTokenAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.headers.authorization as string;
	const secret = envs.secret as string;

	jwt.verify(authorization, secret, (error, decoded) => {
		if (Object(decoded).tipo !== 'admin') {
			res.status(401).json({ message: 'Apenas admin tem acesso' });
		}
		if (error) {
			return res.status(401).json({ message: error.message });
		}
	});

	next();
};
