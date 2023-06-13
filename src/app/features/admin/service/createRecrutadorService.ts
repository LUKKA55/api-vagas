import { IRecrutador } from '../../../models/interface/IRecrutador';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryAdmin } from '../repository';

export const createRecrutadorService = async (
	id: string,
	data: IRecrutador,
	repository: RepositoryAdmin
) => {
	const cacheRepository = new CacheRepository();

	const createRecrutador = await repository.createRecrutador(id, data);
	cacheRepository.del('all-recrutador');
	return createRecrutador;
};
