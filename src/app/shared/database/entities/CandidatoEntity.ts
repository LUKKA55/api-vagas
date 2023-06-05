import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { VagaEntity } from './VagaEntity';
import { VagaCandidatoEntity } from './VagaCandidatoEntity';

@Entity('candidato')
export class CandidatoEntity extends BaseEntity {
	@PrimaryColumn()
	uid!: string;

	@Column()
	name!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column()
	tipo!: 'candidato';

	@Column()
	created_at!: string;

	@Column()
	updated_at!: string;

	@OneToMany(
		() => VagaCandidatoEntity,
		(vagacandidato) => vagacandidato.candidato
	)
	aplicacoes?: VagaCandidatoEntity[];
}
