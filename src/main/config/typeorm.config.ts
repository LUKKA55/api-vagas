import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { AdminEntity } from '../../app/shared/database/entities/AdminEntity';
import { RecrutadorEntity } from '../../app/shared/database/entities/RecrutadorEntity';
import { VagaEntity } from '../../app/shared/database/entities/VagaEntity';
import { CandidatoEntity } from '../../app/shared/database/entities/CandidatoEntity';
import { CreateAdmin1685031247660 } from '../../app/shared/database/migrations/1685031247660-CreateAdmin';
import { CreateRecrutador1685031294540 } from '../../app/shared/database/migrations/1685031294540-CreateRecrutador';
import { CreateVaga1685031325964 } from '../../app/shared/database/migrations/1685031325964-CreateVaga';
import { CreateCandidato1685031339123 } from '../../app/shared/database/migrations/1685031339123-CreateCandidato';
import { VagaCandidato1685033671641 } from '../../app/shared/database/migrations/1685033671641-Vaga_Candidato';
import { VagaCandidatoEntity } from '../../app/shared/database/entities/VagaCandidatoEntity';

require('dotenv').config({ path: './src/app/envs/.env' });
const config: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: false,
	logging: false,
	schema: 'vagasEmprego-api',
	entities: [
		AdminEntity,
		RecrutadorEntity,
		VagaEntity,
		CandidatoEntity,
		VagaCandidatoEntity,
	],
	migrations: [
		CreateAdmin1685031247660,
		CreateRecrutador1685031294540,
		CreateVaga1685031325964,
		CreateCandidato1685031339123,
		VagaCandidato1685033671641,
	],
	ssl: {
		rejectUnauthorized: false,
	},
};

export default config;
