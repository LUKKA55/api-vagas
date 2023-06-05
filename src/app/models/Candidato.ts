export class Candidato {
	constructor(
		private uid?: string,
		private name?: string,
		private email?: string,
		private tipo?: 'candidato',
		private password?: string,
		private created_at?: string,
		private updated_at?: string
	) {}
}
