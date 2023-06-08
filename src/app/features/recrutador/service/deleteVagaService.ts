import { RepositoryRecrutador } from '../repository';

export const deleteVagaService = async (
	uid: string,
	id_vaga: string,
	repository: RepositoryRecrutador
) => {
	return await repository.deleteVaga(uid, id_vaga);
};
