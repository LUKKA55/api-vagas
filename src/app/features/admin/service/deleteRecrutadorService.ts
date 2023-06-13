import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryAdmin } from '../repository';

export const deleteRecrutadorService = async (
	id: string,
	repository: RepositoryAdmin
) => {
	const cacheRepository = new CacheRepository();
	const deleteRecrutador = await repository.deleteRecrutador(id);
	cacheRepository.del('all-recrutador');
	return deleteRecrutador;
};
