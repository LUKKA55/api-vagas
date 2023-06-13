import { Recrutador } from '../../../models/Recrutador';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryRecrutador } from '../repository';

export const getAllRecrutadorService = async (
	repository: RepositoryRecrutador
) => {
	const cacheRepository = new CacheRepository();
	const cacheGetAllRecrutador = await cacheRepository.get('all-recrutador');
	if (cacheGetAllRecrutador) {
		return cacheGetAllRecrutador as Recrutador[];
	}
	const getAllRecrutador = await repository.getAllRecrutador();
	await cacheRepository.set('all-recrutador', getAllRecrutador);
	return getAllRecrutador;
};
