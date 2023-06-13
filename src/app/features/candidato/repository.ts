import { Repository } from 'typeorm';
import { CandidatoEntity } from '../../shared/database/entities/CandidatoEntity';
import { DatabaseConnection } from '../../../main/database';
import { ICandidato } from '../../models/interface/ICandidato';
import { v4 } from 'uuid';
import newDate from '../../utils/newDate';
import { Candidato } from '../../models/Candidato';
import jwt from 'jsonwebtoken';
import { VagaCandidatoEntity } from '../../shared/database/entities/VagaCandidatoEntity';
import { VagaEntity } from '../../shared/database/entities/VagaEntity';
import { Vaga } from '../../models/vaga';
require('dotenv').config({ path: './src/app/envs/.env' });

export class RepositoryCandidato {
	private repository: Repository<CandidatoEntity>;
	constructor() {
		this.repository = DatabaseConnection.client.getRepository(CandidatoEntity);
	}

	async createCandidato(data: ICandidato) {
		const createCandidato = this.repository.create({
			uid: v4(),
			name: data.name,
			email: data.email,
			password: data.password,
			tipo: data.tipo,
			created_at: newDate(),
			updated_at: newDate(),
		});
		const save = await this.repository.save(createCandidato);
		const compileCandidato = new Candidato(
			save.uid,
			save.name,
			save.email,
			save.tipo,
			save.password,
			save.created_at,
			save.updated_at
		);
		return compileCandidato;
	}

	async loginCandidato(name: string, email: string, password: string) {
		const find = await this.repository.findOne({
			where: {
				name: name,
				email: email,
				password: password,
				tipo: 'candidato',
			},
		});
		if (!find) {
			throw Error('Falha ao realizar o login');
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

	async updateCandidato(data: ICandidato, id: string) {
		await this.repository.update(
			{ uid: id },
			{
				name: data.name ? data.name : undefined,
				email: data.email ? data.email : undefined,
				password: data.password ? data.password : undefined,
				updated_at: newDate(),
			}
		);
		const find = await this.repository.findOne({ where: { uid: id } });
		if (find !== null) {
			const compileCandidato = new Candidato(
				find.uid,
				find.name,
				find.email,
				find.tipo,
				find.password,
				find.created_at,
				find.updated_at
			);
			return compileCandidato;
		}
	}

	async deleteCandidato(id: string) {
		const vagaCandidato =
			DatabaseConnection.client.manager.getRepository(VagaCandidatoEntity);
		const relacoes = await vagaCandidato.find({
			where: { uidCandidato: id },
		});
		await vagaCandidato.remove(relacoes);
		return await this.repository.delete({ uid: id });
	}

	async getAllVagas() {
		const vagas = await DatabaseConnection.client.manager
			.getRepository(VagaEntity)
			.find();

		const compileVaga = vagas.map((vaga) => {
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

	async getVagaById(id_vaga: string) {
		const vaga = await DatabaseConnection.client.manager
			.getRepository(VagaEntity)
			.findOne({ where: { uid: id_vaga } });

		if (vaga !== null) {
			const compileVaga = new Vaga(
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
			return compileVaga;
		}
	}

	async candidatura(id: string, id_vaga: string) {
		await DatabaseConnection.client.manager
			.getRepository(VagaCandidatoEntity)
			.create({ uid: v4(), uidCandidato: id, uidVaga: id_vaga })
			.save();
		const find = await DatabaseConnection.client.manager
			.getRepository(VagaEntity)
			.findOne({ where: { uid: id_vaga } });
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

	async getAllCandidaturas(id: string) {
		const getCandidaturas = await DatabaseConnection.client.manager
			.getRepository(VagaCandidatoEntity)
			.find({ where: { uidCandidato: id }, relations: ['vaga'] });

		const vagas = getCandidaturas.map((vaga) => vaga.vaga);
		return vagas;
	}
}
