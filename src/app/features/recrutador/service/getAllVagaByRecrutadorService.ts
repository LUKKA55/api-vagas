import { RepositoryRecrutador } from '../repository';

export const getAllVagaByRecrutadorService = async (
	id: string,
	repository: RepositoryRecrutador
) => {
	return await repository.getAllVaga(id);
};
