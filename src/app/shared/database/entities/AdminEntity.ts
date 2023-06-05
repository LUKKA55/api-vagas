import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RecrutadorEntity } from './RecrutadorEntity';

@Entity('admin')
export class AdminEntity extends BaseEntity {
	@PrimaryColumn()
	uid!: string;

	@Column()
	name!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column()
	tipo!: 'admin';

	@Column()
	created_at!: string;

	@Column()
	updated_at!: string;

	@OneToMany(() => RecrutadorEntity, (recrutadores) => recrutadores.uidAdmin)
	recrutadores?: RecrutadorEntity[];
}
