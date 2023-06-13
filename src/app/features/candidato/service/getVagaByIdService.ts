import { Vaga } from '../../../models/vaga';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryCandidato } from '../repository';

export const getVagaByIdService = async (
	id_vaga: string,
	repository: RepositoryCandidato
) => {
	const cacheRepository = new CacheRepository();
	const cacheGetVagaById = await cacheRepository.get(`vaga-${id_vaga}`);
	if (cacheGetVagaById) {
		return cacheGetVagaById;
	}
	const vaga = await repository.getVagaById(id_vaga);
	cacheRepository.set(`vaga-${id_vaga}`, vaga as Vaga);
	return vaga;
};
