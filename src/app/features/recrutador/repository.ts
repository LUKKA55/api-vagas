import { Repository } from 'typeorm';
import { RecrutadorEntity } from '../../shared/database/entities/RecrutadorEntity';
import { DatabaseConnection } from '../../../main/database';
import { IRecrutador } from '../../models/interface/IRecrutador';
import newDate from '../../utils/newDate';
import { Recrutador } from '../../models/Recrutador';
import { v4 } from 'uuid';
import { VagaEntity } from '../../shared/database/entities/VagaEntity';
import { IVaga } from '../../models/interface/IVaga';
import { Vaga } from '../../models/vaga';
import jwt from 'jsonwebtoken';
import { VagaCandidatoEntity } from '../../shared/database/entities/VagaCandidatoEntity';
require('dotenv').config({ path: './src/app/envs/.env' });

export class RepositoryRecrutador {
	private repository: Repository<RecrutadorEntity>;
	private vagaRepository: Repository<VagaEntity>;
	constructor() {
		this.repository =
			DatabaseConnection.client.manager.getRepository(RecrutadorEntity);
		this.vagaRepository =
			DatabaseConnection.client.manager.getRepository(VagaEntity);
	}

	async updateRecrutador(id: string, data: IRecrutador) {
		await this.repository.update(
			{ uid: id },
			{
				name: data.name ? data.name : undefined,
				email: data.email ? data.email : undefined,
				password: data.password ? data.password : undefined,
				nomeEmpresa: data.nomeEmpresa ? data.nomeEmpresa : undefined,
				updated_at: newDate(),
			}
		);
		const findRecrutador = await this.repository.findOne({
			where: { uid: id },
		});
		if (findRecrutador !== null) {
			const compileRecrutador = new Recrutador(
				findRecrutador.uid,
				findRecrutador.name,
				findRecrutador.email,
				findRecrutador.password,
				findRecrutador.nomeEmpresa,
				findRecrutador.tipo,
				findRecrutador.created_at,
				findRecrutador.updated_at,
				findRecrutador.uidAdmin
			);
			return compileRecrutador;
		}
	}

	async getAllRecrutador() {
		const getAllRecrutador = await this.repository.find();
		return getAllRecrutador.map((recrutador) => {
			return new Recrutador(
				recrutador.uid,
				recrutador.name,
				recrutador.email,
				undefined,
				recrutador.nomeEmpresa,
				recrutador.tipo,
				recrutador.created_at,
				recrutador.updated_at,
				recrutador.uidAdmin
			);
		});
	}

	async createVaga(id: string, data: IVaga) {
		const createVaga = this.vagaRepository.create({
			uid: v4(),
			descricao: data.descrição,
			empresa: data.empresa,
			dataLimite: data.dataLimite,
			status: true,
			uidRecrutador: id,
			numeroMaximoCandidatos: data.numeroMaximoCandidatos,
			created_at: newDate(),
			updated_at: newDate(),
		});

		const save = await this.vagaRepository.save(createVaga);

		const compileVaga = new Vaga(
			save.uid,
			save.descricao,
			save.empresa,
			save.dataLimite,
			save.status,
			save.uidRecrutador,
			save.numeroMaximoCandidatos,
			save.created_at,
			save.updated_at
		);
		return compileVaga;
	}

	async loginRecrutador(name: string, email: string, password: string) {
		const find = await this.repository.findOne({
			where: {
				name: name,
				email: email,
				password: password,
				tipo: 'recrutador',
			},
		});

		if (!find) {
			throw Error('falha ao realizar o login');
		}

		const token = jwt.sign(
			{
				uid: find.uid,
				name: find.name,
				email: find.email,
				tipo: find.tipo,
			},
			process.env.JWT_KEY as string,
			{ expiresIn: '6h' }
		);

		return { token: token, uid: find.uid, name: find.name };
	}

	async updateVaga(data: IVaga, id_vaga: string) {
		console.log('dado', data, id_vaga);
		await this.vagaRepository.update(
			{ uid: id_vaga },
			{
				descricao: data.descrição ? data.descrição : undefined,
				empresa: data.empresa ? data.empresa : undefined,
				dataLimite: data.dataLimite ? data.dataLimite : undefined,
				status: data.status !== undefined ? data.status : undefined,
				numeroMaximoCandidatos: data.numeroMaximoCandidatos
					? data.numeroMaximoCandidatos
					: undefined,
				updated_at: newDate(),
			}
		);
		const find = await this.vagaRepository.findOne({ where: { uid: id_vaga } });
		if (find !== null) {
			const compileVaga = new Vaga(
				find.uid,
				find.descricao,
				find.empresa,
				find.dataLimite,
				find.status,
				find.uidRecrutador,
				find.numeroMaximoCandidatos,
				find.created_at,
				find.updated_at
			);
			return compileVaga;
		}
	}

	async getAllVaga(id: string) {
		const allVaga = await this.vagaRepository.find({
			where: { uidRecrutador: id },
		});
		const compileVaga = allVaga.map((vaga) => {
			return new Vaga(
				vaga.uid,
				vaga.descricao,
				vaga.empresa,
				vaga.dataLimite,
				vaga.status,
				vaga.uidRecrutador,
				vaga.numeroMaximoCandidatos,
				vaga.created_at,
				vaga.updated_at
			);
		});

		return compileVaga;
	}

	async deleteVaga(id_vaga: string) {
		const vagaCandidato =
			DatabaseConnection.client.manager.getRepository(VagaCandidatoEntity);
		const relacoes = await vagaCandidato.find({
			where: { uidVaga: id_vaga },
		});
		await vagaCandidato.remove(relacoes);

		return await this.vagaRepository.delete({ uid: id_vaga });
	}
}
