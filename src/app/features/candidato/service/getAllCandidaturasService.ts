import { VagaEntity } from '../../../shared/database/entities/VagaEntity';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryCandidato } from '../repository';

export const getAllCandidaturasService = async (
	id: string,
	repository: RepositoryCandidato
) => {
	const cacheRepository = new CacheRepository();
	const cacheCandidaturas = await cacheRepository.get(`all-candidaturas-${id}`);
	if (cacheCandidaturas) {
		return cacheCandidaturas as (VagaEntity | undefined)[];
	}
	const candidaturas = await repository.getAllCandidaturas(id);
	cacheRepository.set(`all-candidaturas-${id}`, candidaturas);
	return candidaturas;
};
