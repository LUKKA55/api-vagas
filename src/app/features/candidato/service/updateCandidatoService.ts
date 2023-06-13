import { ICandidato } from '../../../models/interface/ICandidato';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryCandidato } from '../repository';

export const updateCandidatoService = async (
	data: ICandidato,
	id: string,
	repository: RepositoryCandidato
) => {
	const cacheRepository = new CacheRepository();

	const updateCandidato = await repository.updateCandidato(data, id);
	await cacheRepository.del('all-candidato');
	return updateCandidato;
};
