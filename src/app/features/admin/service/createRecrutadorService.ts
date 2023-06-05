import { IRecrutador } from '../../../models/interface/IRecrutador';
import { RepositoryAdmin } from '../repository';

export const createRecrutadorService = async (
	id: string,
	data: IRecrutador,
	repository: RepositoryAdmin
) => {
	return await repository.createRecrutador(id, data);
};
