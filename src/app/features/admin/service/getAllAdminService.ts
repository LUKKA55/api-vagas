import { Admin } from '../../../models/Admin';
import { Candidato } from '../../../models/Candidato';
import { Recrutador } from '../../../models/Recrutador';
import { CacheRepository } from '../../cache/cacheRepository';
import { RepositoryAdmin } from '../repository';

export const getAllService = async (
	tipo: string,
	repository: RepositoryAdmin
) => {
	const cacheRepository = new CacheRepository();
	const cacheGetAll = await cacheRepository.get(`all-${tipo}`);
	if (cacheGetAll) {
		return cacheGetAll as Promise<
			Admin[] | Recrutador[] | Candidato[] | 'nada encontrado'
		>;
	}

	const getAll = await repository.getAll(tipo);

	cacheRepository.set(`all-${tipo}`, getAll);
	return getAll;
};
