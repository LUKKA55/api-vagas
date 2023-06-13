import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryCandidato } from '../repository';

export const getAllVagasService = async (repository: RepositoryCandidato) => {
	const cacheRepository = new CacheRepository();
	const cacheGetAllVaga = await cacheRepository.get('all-vaga');
	if (cacheGetAllVaga) {
		return cacheGetAllVaga;
	}
	const allVagas = await repository.getAllVagas();
	cacheRepository.set('all-vaga', allVagas);
	return allVagas;
};
