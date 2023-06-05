import { RepositoryRecrutador } from '../repository';

export const getAllRecrutadorService = async (
	repository: RepositoryRecrutador
) => {
	return await repository.getAllRecrutador();
};
