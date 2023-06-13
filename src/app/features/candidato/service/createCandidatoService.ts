import { ICandidato } from '../../../models/interface/ICandidato';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryCandidato } from '../repository';

export const createCandidatoService = async (
	data: ICandidato,
	repository: RepositoryCandidato
) => {
	const cacheRepository = new CacheRepository();
	const createCandidato = await repository.createCandidato(data);
	cacheRepository.del('all-candidato');
	return createCandidato;
};
