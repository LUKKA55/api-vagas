import { IVaga } from '../../../models/interface/IVaga';
import { RepositoryRecrutador } from '../repository';

export const updateVagaService = async (
	uid: string,
	data: IVaga,
	id_vaga: string,
	repository: RepositoryRecrutador
) => {
	return await repository.updateVaga(uid, data, id_vaga);
};
