import { Router } from 'express';
import { updateRecrutadorController } from './controller/updateRecrutadorController';
import {
	validateBody,
	validateCreateVaga,
	validateGetByIdRecrutador,
	validateIdRecrutadorVaga,
	validateTokenRecrutador,
	validateUpdateRecrutador,
} from './middlewares';
import { getAllRecrutadorController } from './controller/getAllRecrutadorController';
import { createVagaController } from './controller/createVagaController';
import { loginRecrutadorController } from './controller/loginRecrutadirController';
import { updateVagaController } from './controller/updateVagaController';
import { getAllVagaByRecrutadorController } from './controller/getAllVagaByRecrutadorController';
import { deleteVagaController } from './controller/deleteVagaController';

export const recrutadorRoutes = Router();

recrutadorRoutes.put(
	'/:id/vaga/:id_vaga',
	validateTokenRecrutador,
	validateIdRecrutadorVaga,
	validateCreateVaga,
	updateVagaController
);
recrutadorRoutes.put(
	'/:id',
	validateTokenRecrutador,
	validateGetByIdRecrutador,
	validateUpdateRecrutador,
	updateRecrutadorController
);
recrutadorRoutes.get('/', validateTokenRecrutador, getAllRecrutadorController);
recrutadorRoutes.get(
	'/:id',
	validateTokenRecrutador,
	getAllVagaByRecrutadorController
);
recrutadorRoutes.post('/login', validateBody, loginRecrutadorController);
recrutadorRoutes.post(
	'/:id',
	validateTokenRecrutador,
	validateBody,
	validateCreateVaga,
	createVagaController
);
recrutadorRoutes.delete(
	'/:id/vaga/:id_vaga',
	validateTokenRecrutador,
	validateIdRecrutadorVaga,
	deleteVagaController
);
