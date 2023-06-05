import { RepositoryCandidato } from '../repository';

export const loginCandidatoService = async (
	name: string,
	email: string,
	password: string,
	repository: RepositoryCandidato
) => {
	return await repository.loginCandidato(name, email, password);
};
