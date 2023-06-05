import { IRecrutador } from '../../../models/interface/IRecrutador';
import { IVaga } from '../../../models/interface/IVaga';
import { RepositoryRecrutador } from '../repository';

export const createVagaService = async (
	id: string,
	data: IVaga,
	repository: RepositoryRecrutador
) => {
	return await repository.createVaga(id, data);
};
