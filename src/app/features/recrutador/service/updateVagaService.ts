import { IVaga } from '../../../models/interface/IVaga';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryRecrutador } from '../repository';

export const updateVagaService = async (
	uid: string,
	data: IVaga,
	id_vaga: string,
	repository: RepositoryRecrutador
) => {
	const cacheRepository = new CacheRepository();

	const updateVaga = await repository.updateVaga(data, id_vaga);
	cacheRepository.del(`vaga-recrutador-${uid}`);
	cacheRepository.del('all-vaga');
	cacheRepository.del(`vaga-${id_vaga}`);
	return updateVaga;
};
