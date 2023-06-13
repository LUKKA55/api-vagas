import { IAdmin } from '../../../models/interface/IAdmin';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryAdmin } from '../repository';

export const createAdminService = async (
	data: IAdmin,
	repository: RepositoryAdmin
) => {
	const cacheRepository = new CacheRepository();

	const createAdmin = await repository.createAdmin(data);
	cacheRepository.del('all-admin');
	return createAdmin;
};
