import { RepositoryAdmin } from '../repository';

export const deleteAdminService = async (
	id: string,
	repository: RepositoryAdmin
) => {
	return await repository.deleteAdmin(id);
};
