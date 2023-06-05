import { RepositoryCandidato } from '../repository';

export const deleteCandidatoService = async (
	id: string,
	repository: RepositoryCandidato
) => {
	return await repository.deleteCandidato(id);
};
