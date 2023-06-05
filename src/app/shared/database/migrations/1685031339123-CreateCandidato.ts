import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCandidato1685031339123 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'candidado',
				columns: [
					{ name: 'uid', type: 'uuid', isPrimary: true, isNullable: false },
					{ name: 'name', type: 'varchar', isNullable: false },
					{ name: 'email', type: 'varchar', isNullable: false, isUnique: true },
					{ name: 'password', type: 'varchar', isNullable: false },
					{ name: 'tipo', type: 'varchar', isNullable: false },
					{
						name: 'created_at',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'updated_at',
						type: 'varchar',
						isNullable: false,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('candidato', true, true, true);
	}
}
