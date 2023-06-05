import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVaga1685031325964 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'vaga',
				columns: [
					{ name: 'uid', type: 'uuid', isPrimary: true, isNullable: false },
					{ name: 'descricao', type: 'varchar', isNullable: false },
					{ name: 'empresa', type: 'varchar', isNullable: false },
					{ name: 'dataLimite', type: 'varchar', isNullable: false },
					{ name: 'status', type: 'boolean', default: true },
					{ name: 'uidRecrutador', type: 'varchar', isNullable: false },
					{ name: 'numeroMaximoCandidatos', type: 'int', isNullable: false },
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
						name: 'fk_vaga_recrutador',
						columnNames: ['uidRecrutador'],
						referencedColumnNames: ['uid'],
						referencedTableName: 'recrutador',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('vaga', true, true, true);
	}
}
