import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryCandidato } from '../repository';

export const candidaturaService = async (
	id: string,
	id_vaga: string,
	repository: RepositoryCandidato
) => {
	const cacheRepository = new CacheRepository();
	const candidatura = await repository.candidatura(id, id_vaga);
	await cacheRepository.del(`all-candidaturas-${id}`);
	return candidatura;
};
