import { RepositoryCandidato } from '../repository';

export const candidaturaService = async (
	id: string,
	id_vaga: string,
	repository: RepositoryCandidato
) => {
	return await repository.candidatura(id, id_vaga);
};
