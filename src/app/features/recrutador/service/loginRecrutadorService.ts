import { RepositoryRecrutador } from '../repository';

export const loginRecrutadorService = async (
	name: string,
	email: string,
	password: string,
	repository: RepositoryRecrutador
) => {
	return await repository.loginRecrutador(name, email, password);
};
