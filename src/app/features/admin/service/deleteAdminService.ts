import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryAdmin } from '../repository';

export const deleteAdminService = async (
	id: string,
	repository: RepositoryAdmin
) => {
	const cacheRepository = new CacheRepository();
	const deleteAdmin = await repository.deleteAdmin(id);
	cacheRepository.del('all-admin');
	return deleteAdmin;
};
