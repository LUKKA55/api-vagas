import { IRecrutador } from '../../../models/interface/IRecrutador';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryRecrutador } from '../repository';

export const updateRecrutadorService = async (
	data: IRecrutador,
	id: string,
	repository: RepositoryRecrutador
) => {
	const cacheRepository = new CacheRepository();
	const updateRecrutador = await repository.updateRecrutador(id, data);
	cacheRepository.del('all-recrutador');
	return updateRecrutador;
};
