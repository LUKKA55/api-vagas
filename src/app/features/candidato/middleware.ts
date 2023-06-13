import { NextFunction, Request, Response } from 'express';
import { DatabaseConnection } from '../../../main/database';
import { CandidatoEntity } from '../../shared/database/entities/CandidatoEntity';
import { envs } from '../../envs/envsObject';
import jwt from 'jsonwebtoken';
import { VagaEntity } from '../../shared/database/entities/VagaEntity';
import { Vaga } from '../../models/vaga';
import { VagaCandidatoEntity } from '../../shared/database/entities/VagaCandidatoEntity';
import { getIdByToken } from '../../utils/getIdByToken';

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

export const validateCreateCandidato = async (
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
				.getRepository(CandidatoEntity)
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
		if (tipo !== 'candidato') {
			return res.status(404).json({ message: 'Tipo inválido' });
		}
	}
	next();
};

export const validateGetByIdCandidato = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const find = await DatabaseConnection.client.manager
		.getRepository(CandidatoEntity)
		.findOne({ where: { uid: req.params.id } });
	if (!find) {
		return res.status(404).json({ message: 'ID de candidato não encontrado' });
	}
	next();
};

export const validateCandidatoToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.headers.authorization as string;
	const secret = envs.secret as string;

	jwt.verify(authorization, secret, (error, decoded) => {
		if (Object(decoded).tipo !== 'candidato') {
			return res.status(404).json({ message: 'Apenas candidatos tem acesso' });
		}
		if (error) {
			return res.status(401).json({ message: error.message });
		}
	});
	next();
};

export const validateVagaCandidatura = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const uid = getIdByToken(req.headers.authorization as string);
	const url = DatabaseConnection.client.manager.getRepository(VagaEntity);
	const vaga = await url.findOne({ where: { uid: req.params.id_vaga } });
	if (!vaga) {
		return res.status(404).json({ message: 'ID de vaga não encontrado' });
	}

	if (vaga.status === false) {
		return res.status(200).json({ message: 'Vaga não está mais disponível' });
	}
	if (vaga.dataLimite === new Date().toLocaleDateString()) {
		await url.update({ uid: vaga.uid }, { status: false });
		return res.status(200).json({ message: 'Data limite excedida' });
	}

	const candidatura = await DatabaseConnection.client.manager
		.getRepository(VagaCandidatoEntity)
		.findOne({
			where: { uidCandidato: uid, uidVaga: req.params.id_vaga },
		});
	if (candidatura !== null) {
		return res
			.status(200)
			.json({ message: 'Você já se candidatou a está vaga' });
	}
	return next();
};

export const validateVaga = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const uid = getIdByToken(req.headers.authorization as string);
	const url = DatabaseConnection.client.manager.getRepository(VagaEntity);
	const vaga = await url.findOne({ where: { uid: req.params.id_vaga } });
	if (!vaga) {
		return res.status(404).json({ message: 'ID de vaga não encontrado' });
	}

	if (vaga.status === false) {
		return res.status(200).json({ message: 'Vaga não está mais disponível' });
	}
	if (vaga.dataLimite === new Date().toLocaleDateString()) {
		await url.update({ uid: vaga.uid }, { status: false });
		return res.status(200).json({ message: 'Data limite excedida' });
	}
	return next();
};
