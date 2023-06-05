import { RepositoryAdmin } from '../repository';

export const getAllService = async (
	tipo: string,
	repository: RepositoryAdmin
) => {
	return await repository.getAll(tipo);
};
