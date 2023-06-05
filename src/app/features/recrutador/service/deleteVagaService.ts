import { RepositoryRecrutador } from '../repository';

export const deleteVagaService = async (
	id_vaga: string,
	repository: RepositoryRecrutador
) => {
	return await repository.deleteVaga(id_vaga);
};
