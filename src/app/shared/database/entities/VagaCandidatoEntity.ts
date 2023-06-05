import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { CandidatoEntity } from './CandidatoEntity';
import { VagaEntity } from './VagaEntity';

@Entity('vaga_candidato')
export class VagaCandidatoEntity extends BaseEntity {
	@PrimaryColumn()
	uid!: string;

	@Column({ name: 'uidvaga' })
	uidVaga!: string;

	@Column({ name: 'uidcandidato' })
	uidCandidato!: string;

	@ManyToOne(() => VagaEntity, (vaga) => vaga.aplicacoes)
	@JoinColumn({ name: 'uidvaga', referencedColumnName: 'uid' })
	vaga?: VagaEntity;

	@ManyToOne(() => CandidatoEntity, (candidato) => candidato.aplicacoes)
	@JoinColumn({ name: 'uidcandidato', referencedColumnName: 'uid' })
	candidato?: CandidatoEntity;
}
