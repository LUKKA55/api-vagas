import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryRecrutador } from '../repository';

export const deleteVagaService = async (
	uid: string,
	id_vaga: string,
	repository: RepositoryRecrutador
) => {
	const cacheRepository = new CacheRepository();

	const deleteVaga = await repository.deleteVaga(id_vaga);
	cacheRepository.del(`vaga-recrutador-${uid}`);
	cacheRepository.del('all-vaga');
	cacheRepository.del(`vaga-${id_vaga}`);
	return deleteVaga;
};
