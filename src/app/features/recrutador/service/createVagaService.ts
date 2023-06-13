import { IRecrutador } from '../../../models/interface/IRecrutador';
import { IVaga } from '../../../models/interface/IVaga';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryRecrutador } from '../repository';

export const createVagaService = async (
	id: string,
	data: IVaga,
	repository: RepositoryRecrutador
) => {
	const cacheRepository = new CacheRepository();

	const createVaga = await repository.createVaga(id, data);
	cacheRepository.del(`vaga-recrutador-${id}`);
	cacheRepository.del('all-vaga');
	return createVaga;
};
