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
	'/updateOneVaga/:id_vaga',
	validateTokenRecrutador,
	validateIdRecrutadorVaga,
	validateCreateVaga,
	updateVagaController
);
recrutadorRoutes.put(
	'/updateOneRecrutador',
	validateTokenRecrutador,
	validateUpdateRecrutador,
	updateRecrutadorController
);
recrutadorRoutes.get('/', validateTokenRecrutador, getAllRecrutadorController);
recrutadorRoutes.get(
	'/getAllVagaByRecrutador',
	validateTokenRecrutador,
	getAllVagaByRecrutadorController
);
recrutadorRoutes.post('/login', validateBody, loginRecrutadorController);
recrutadorRoutes.post(
	'/createVaga',
	validateTokenRecrutador,
	validateBody,
	validateCreateVaga,
	createVagaController
);
recrutadorRoutes.delete(
	'/deleteOneVaga/:id_vaga',
	validateTokenRecrutador,
	validateIdRecrutadorVaga,
	deleteVagaController
);
