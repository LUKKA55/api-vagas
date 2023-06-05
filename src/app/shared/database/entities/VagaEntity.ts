import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { RecrutadorEntity } from './RecrutadorEntity';
import { VagaCandidatoEntity } from './VagaCandidatoEntity';

@Entity('vaga')
export class VagaEntity extends BaseEntity {
	@PrimaryColumn()
	uid!: string;

	@Column()
	descricao!: string;

	@Column()
	empresa!: string;

	@Column({ name: 'datalimite' })
	dataLimite!: string;

	@Column()
	status!: boolean;

	@Column({ name: 'uidrecrutador' })
	uidRecrutador!: string;

	@Column({ name: 'numeromaximocandidato' })
	numeroMaximoCandidatos!: number;

	@Column()
	created_at!: string;

	@Column()
	updated_at!: string;

	@ManyToOne(() => RecrutadorEntity, (recrutador) => recrutador.vagasCriadas)
	@JoinColumn({ name: 'uidrecrutador', referencedColumnName: 'uid' })
	recrutador?: RecrutadorEntity;

	@OneToMany(() => VagaCandidatoEntity, (vagacandidato) => vagacandidato.vaga)
	aplicacoes?: VagaCandidatoEntity[];
}
