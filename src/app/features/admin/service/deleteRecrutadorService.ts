import { RepositoryAdmin } from '../repository';

export const deleteRecrutadorService = async (
	id: string,
	repository: RepositoryAdmin
) => {
	return await repository.deleteRecrutador(id);
};
