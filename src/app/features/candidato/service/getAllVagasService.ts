import { RepositoryCandidato } from '../repository';

export const getAllVagasService = async (repository: RepositoryCandidato) => {
	return await repository.getAllVagas();
};
