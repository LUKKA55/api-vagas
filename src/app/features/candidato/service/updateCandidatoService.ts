import { ICandidato } from '../../../models/interface/ICandidato';
import { RepositoryCandidato } from '../repository';

export const updateCandidatoService = async (
	data: ICandidato,
	id: string,
	repository: RepositoryCandidato
) => {
	return await repository.updateCandidato(data, id);
};
