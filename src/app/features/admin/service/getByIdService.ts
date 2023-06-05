import { RepositoryAdmin } from '../repository';

export const getByIdService = async (
	id: string,
	repository: RepositoryAdmin
) => {
	return await repository.getByIdAdmin(id);
};
