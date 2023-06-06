import { Router } from 'express';
import { createCandidatoController } from './controller/createCandidatoController';
import {
	validateBody,
	validateCandidatoToken,
	validateCreateCandidato,
	validateGetByIdCandidato,
	validateVaga,
} from './middleware';
import { loginCandidatoController } from './controller/loginCandidatoController';
import { updateCandidatoController } from './controller/updateCandidatoController';
import { deleteCandidatoController } from './controller/deleteCandidatoController';
import { getAllVagasController } from './controller/getAllVagasController';
import { candidaturaController } from './controller/candidatutaController';

export const candidatoRoutes = Router();

candidatoRoutes.post(
	'/',
	validateBody,
	validateCreateCandidato,
	createCandidatoController
);

candidatoRoutes.post('/login', validateBody, loginCandidatoController);
candidatoRoutes.put(
	'/updateOneCandidato',
	validateCandidatoToken,
	validateCreateCandidato,
	updateCandidatoController
);
candidatoRoutes.delete(
	'/deleteOneCandidato',
	validateCandidatoToken,
	deleteCandidatoController
);
candidatoRoutes.get('/vagas', validateCandidatoToken, getAllVagasController);
candidatoRoutes.post(
	'/candidatura/:id_vaga',
	validateCandidatoToken,
	validateVaga,
	candidaturaController
);
