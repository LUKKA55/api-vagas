import { Repository } from 'typeorm';
import { AdminEntity } from '../../shared/database/entities/AdminEntity';
import { DatabaseConnection } from '../../../main/database';
import { IAdmin } from '../../models/interface/IAdmin';
import { v4 } from 'uuid';
import newDate from '../../utils/newDate';
import { Admin } from '../../models/Admin';
import { IRecrutador } from '../../models/interface/IRecrutador';
import { RecrutadorEntity } from '../../shared/database/entities/RecrutadorEntity';
import { Recrutador } from '../../models/Recrutador';
import jwt from 'jsonwebtoken';
import { CandidatoEntity } from '../../shared/database/entities/CandidatoEntity';
import { Candidato } from '../../models/Candidato';
require('dotenv').config({ path: './src/app/envs/.env' });

export class RepositoryAdmin {
	private repository: Repository<AdminEntity>;
	constructor() {
		this.repository = DatabaseConnection.client.getRepository(AdminEntity);
	}

	async createAdmin(data: IAdmin) {
		const createAdmin = this.repository.create({
			uid: v4(),
			name: data.name,
			email: data.email,
			password: data.password,
			tipo: data.tipo,
			created_at: newDate(),
			updated_at: newDate(),
		});
		const save = await this.repository.save(createAdmin);
		const compileAdmin = new Admin(
			save.uid,
			save.name,
			save.email,
			save.tipo,
			save.password,
			save.created_at,
			save.updated_at
		);
		return compileAdmin;
	}

	async getAll(tipo: string) {
		if (tipo === 'admin') {
			const getAllAdmin = await this.repository.find();
			const compileAdmin = getAllAdmin.map((admin) => {
				return new Admin(
					admin.uid,
					admin.name,
					admin.email,
					admin.tipo,
					undefined,
					admin.created_at,
					admin.updated_at
				);
			});
			return compileAdmin;
		}
		if (tipo === 'recrutador') {
			const getAllRecrutador = await DatabaseConnection.client.manager
				.getRepository(RecrutadorEntity)
				.find();
			const compileRecrutador = getAllRecrutador.map((recrutador) => {
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
			return compileRecrutador;
		}
		if (tipo === 'candidato') {
			const getAllCandidato = await DatabaseConnection.client.manager
				.getRepository(CandidatoEntity)
				.find();
			const compileCandidato = getAllCandidato.map((candidato) => {
				return new Candidato(
					candidato.uid,
					candidato.name,
					candidato.email,
					candidato.tipo,
					undefined,
					candidato.created_at,
					candidato.updated_at
				);
			});
			return compileCandidato;
		}
	}

	async getByIdAdmin(id: string) {
		const getByIdAdmin = await this.repository.findOne({ where: { uid: id } });
		if (getByIdAdmin === null) {
			return Error('Não a Admin com esse ID');
		}
		const compileAdmin = new Admin(
			getByIdAdmin.uid,
			getByIdAdmin.name,
			getByIdAdmin.email,
			getByIdAdmin.tipo,
			undefined,
			getByIdAdmin.created_at,
			getByIdAdmin.updated_at
		);
		return compileAdmin;
	}

	async deleteAdmin(id: string) {
		return await this.repository.delete({ uid: id });
	}

	async updateAdmin(id: string, data: IAdmin) {
		await this.repository.update(
			{ uid: id },
			{
				name: data.name ? data.name : undefined,
				email: data.email ? data.email : undefined,
				password: data.password ? data.password : undefined,
				updated_at: newDate(),
			}
		);
		const findAdmin = await this.repository.findOne({
			where: { uid: id },
		});

		if (findAdmin !== null) {
			const compileAdmin = new Admin(
				findAdmin.uid,
				findAdmin.name,
				findAdmin.email,
				findAdmin.tipo,
				findAdmin.password,
				findAdmin.created_at,
				findAdmin.updated_at
			);
			return compileAdmin;
		}
	}

	async createRecrutador(id: string, data: IRecrutador) {
		console.log('name', data);
		const createRecrutador = DatabaseConnection.client.manager
			.getRepository(RecrutadorEntity)
			.create({
				uid: v4(),
				name: data.name,
				email: data.email,
				password: data.password,
				nomeEmpresa: data.nomeEmpresa,
				tipo: data.tipo,
				created_at: newDate(),
				updated_at: newDate(),
				uidAdmin: id,
			});
		const save = await DatabaseConnection.client.manager
			.getRepository(RecrutadorEntity)
			.save(createRecrutador);

		const compileRecrutador = new Recrutador(
			save.uid,
			save.name,
			save.email,
			save.password,
			save.nomeEmpresa,
			save.tipo,
			save.created_at,
			save.updated_at,
			save.uidAdmin
		);
		return compileRecrutador;
	}

	async deleteRecrutador(id: string) {
		return await DatabaseConnection.client.manager
			.getRepository(RecrutadorEntity)
			.delete({ uid: id });
	}

	async loginAdmin(name: string, email: string, password: string) {
		const find = await this.repository.findOne({
			where: { name: name, email: email, password: password, tipo: 'admin' },
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
}
