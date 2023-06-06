export interface Token {
	uid: string;
	name: string;
	email: string;
	tipo: 'admin' | 'recrutador' | 'candidato';
}
