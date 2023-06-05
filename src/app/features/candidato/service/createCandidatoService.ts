import { ICandidato } from '../../../models/interface/ICandidato';
import { RepositoryCandidato } from '../repository';

export const createCandidatoService = async (
	data: ICandidato,
	repository: RepositoryCandidato
) => {
	return await repository.createCandidato(data);
};
