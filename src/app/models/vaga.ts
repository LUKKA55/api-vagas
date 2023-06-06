export class Vaga {
	constructor(
		private uid?: string,
		private descricao?: string,
		private empresa?: string,
		private dataLimite?: string,
		private status?: boolean,
		private uidRecrutador?: string,
		private numeroMaximoCandidatos?: number,
		private created_at?: string,
		private updated_at?: string
	) {}
	get getDescricao() {
		return this.descricao;
	}
}
