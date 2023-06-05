import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class VagaCandidato1685033671641 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'vaga_candidato',
				columns: [
					{
						name: 'uidVaga',
						type: 'varchar',
						isPrimary: true,
					},
					{
						name: 'uidCandidato',
						type: 'varchar',
						isPrimary: true,
					},
				],
				foreignKeys: [
					{
						columnNames: ['uidVaga'],
						referencedColumnNames: ['uid'],
						referencedTableName: 'vaga',
					},
					{
						columnNames: ['uidCandidato'],
						referencedColumnNames: ['uid'],
						referencedTableName: 'candidato',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('vaga_candidato', true, true, true);
	}
}
