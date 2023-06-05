import { IAdmin } from '../../../models/interface/IAdmin';
import { RepositoryAdmin } from '../repository';

export const createAdminService = async (
	data: IAdmin,
	repository: RepositoryAdmin
) => {
	return await repository.createAdmin(data);
};
