import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRecrutador1685031294540 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'recrutador',
				columns: [
					{ name: 'uid', type: 'uuid', isPrimary: true, isNullable: false },
					{ name: 'name', type: 'varchar', isNullable: false },
					{ name: 'email', type: 'varchar', isNullable: false, isUnique: true },
					{ name: 'password', type: 'varchar', isNullable: false },
					{ name: 'nomeEmpresa', type: 'varchar', isNullable: false },
					{ name: 'tipo', type: 'varchar', isNullable: false },
					{ name: 'uidAdmin', type: 'varchar', isNullable: false },

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
				foreignKeys: [
					{
						name: 'fk_recrutador_admin',
						columnNames: ['uidAdmin'],
						referencedColumnNames: ['uid'],
						referencedTableName: 'admin',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('recrutador', true, true, true);
	}
}
