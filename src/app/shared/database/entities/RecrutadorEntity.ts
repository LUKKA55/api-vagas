import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { AdminEntity } from './AdminEntity';
import { VagaEntity } from './VagaEntity';

@Entity('recrutador')
export class RecrutadorEntity extends BaseEntity {
	@PrimaryColumn()
	uid!: string;

	@Column()
	name!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column({ name: 'nomeempresa' })
	nomeEmpresa!: string;

	@Column()
	tipo!: 'recrutador';

	@Column()
	created_at!: string;

	@Column()
	updated_at!: string;

	@Column({ name: 'uidadmin' })
	uidAdmin!: string;

	@ManyToOne(() => AdminEntity, (admin) => admin.recrutadores)
	@JoinColumn({ name: 'uidadmin', referencedColumnName: 'uid' })
	admin?: AdminEntity;

	@OneToMany(() => VagaEntity, (vagasCriadas) => vagasCriadas.uidRecrutador)
	vagasCriadas?: VagaEntity[];
}
