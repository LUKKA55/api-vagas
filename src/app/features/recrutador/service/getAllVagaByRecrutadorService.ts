import { VagaEntity } from '../../../shared/database/entities/VagaEntity';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryRecrutador } from '../repository';

export const getAllVagaByRecrutadorService = async (
	id: string,
	repository: RepositoryRecrutador
) => {
	const cacheRepository = new CacheRepository();
	const cacheGetAllVagaByIdRecrutador = await cacheRepository.get(
		`vaga-recrutador-${id}`
	);
	if (cacheGetAllVagaByIdRecrutador) {
		return cacheGetAllVagaByIdRecrutador as VagaEntity[];
	}
	const vagaByRecrutador = await repository.getAllVaga(id);
	cacheRepository.set(`vaga-recrutador-${id}`, vagaByRecrutador);
	return vagaByRecrutador;
};
