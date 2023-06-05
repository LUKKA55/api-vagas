export class Vaga {
	constructor(
		private uid?: string,
		private descrição?: string,
		private empresa?: string,
		private dataLimite?: string,
		private status?: boolean,
		private uidRecrutador?: string,
		private numeroMaximoCandidatos?: number,
		private created_at?: string,
		private updated_at?: string
	) {}
}
