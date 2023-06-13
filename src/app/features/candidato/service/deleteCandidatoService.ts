import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryCandidato } from '../repository';

export const deleteCandidatoService = async (
	id: string,
	repository: RepositoryCandidato
) => {
	const cacheRepository = new CacheRepository();
	const deleteCandidato = await repository.deleteCandidato(id);
	cacheRepository.del('all-candidato');
	cacheRepository.del(`all-candidaturas-${id}`);
	return deleteCandidato;
};
