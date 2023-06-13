import { IAdmin } from '../../../models/interface/IAdmin';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryAdmin } from '../repository';

export const updateAdminService = async (
	data: IAdmin,
	id: string,
	repository: RepositoryAdmin
) => {
	const cacheRepository = new CacheRepository();

	const updateAdmin = await repository.updateAdmin(id, data);
	cacheRepository.del('all-admin');
	return updateAdmin;
};
