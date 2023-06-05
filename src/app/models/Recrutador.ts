export class Recrutador {
	constructor(
		private uid?: string,
		private name?: string,
		private email?: string,
		private password?: string,
		private nomeEmpresa?: string,
		private tipo?: 'recrutador',
		private created_at?: string,
		private updated_at?: string,
		private uidAdmin?: string
	) {}
}
