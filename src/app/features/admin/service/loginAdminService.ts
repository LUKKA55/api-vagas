import { RepositoryAdmin } from '../repository';

export const loginAdminService = async (
	name: string,
	email: string,
	password: string,
	repository: RepositoryAdmin
) => {
	return await repository.loginAdmin(name, email, password);
};
