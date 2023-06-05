import { IAdmin } from '../../../models/interface/IAdmin';
import { RepositoryAdmin } from '../repository';

export const updateAdminService = async (
	data: IAdmin,
	id: string,
	repository: RepositoryAdmin
) => {
	return await repository.updateAdmin(id, data);
};
