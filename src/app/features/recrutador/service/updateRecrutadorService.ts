import { IRecrutador } from '../../../models/interface/IRecrutador';
import { RepositoryRecrutador } from '../repository';

export const updateRecrutadorService = async (
	data: IRecrutador,
	id: string,
	repository: RepositoryRecrutador
) => {
	return await repository.updateRecrutador(id, data);
};
