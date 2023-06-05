import { IVaga } from '../../../models/interface/IVaga';
import { RepositoryRecrutador } from '../repository';

export const updateVagaService = async (
	data: IVaga,
	id_vaga: string,
	repository: RepositoryRecrutador
) => {
	return await repository.updateVaga(data, id_vaga);
};
