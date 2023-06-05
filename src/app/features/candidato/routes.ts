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
	'/:id',
	validateCandidatoToken,
	validateGetByIdCandidato,
	validateCreateCandidato,
	updateCandidatoController
);
candidatoRoutes.delete(
	'/:id',
	validateCandidatoToken,
	validateGetByIdCandidato,
	deleteCandidatoController
);
candidatoRoutes.get('/vagas', validateCandidatoToken, getAllVagasController);
candidatoRoutes.post(
	'/:id/candidatura/:id_vaga',
	validateCandidatoToken,
	validateGetByIdCandidato,
	validateVaga,
	candidaturaController
);
