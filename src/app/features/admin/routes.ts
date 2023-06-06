import { Router } from 'express';
import { createAdminController } from './controller/createAdminController';
import { getAllController } from './controller/getAllAdminController';
import { getByIdAdminController } from './controller/getByIdAdminController';
import { deleteAdminController } from './controller/deleteAdminController';
import { updateAdminController } from './controller/updateAdminController';
import { createRecrutadorController } from './controller/createRecrutadorController';
import {
	validateBody,
	validateCreateAdmin,
	validateCreateRecrutador,
	validateDeleteRecrutador,
	validateGetByIdAdmin,
	validateTipo,
	validateTokenAdmin,
} from './middlewares';
import { deleteRecrutadorController } from './controller/deleteRecrutadorController';
import { loginAdminController } from './controller/loginAdminController';

const adminRoutes = Router();

adminRoutes.post('/', validateBody, validateCreateAdmin, createAdminController);
adminRoutes.get('/', validateTokenAdmin, getAllController);
adminRoutes.get('/getOneAdmin', validateTokenAdmin, getByIdAdminController);
adminRoutes.delete(
	'/:id',
	validateTokenAdmin,
	validateGetByIdAdmin,
	deleteAdminController
);
adminRoutes.put(
	'/updateOneAdmin',
	validateTokenAdmin,
	validateCreateAdmin,
	updateAdminController
);
adminRoutes.post('/login', validateBody, loginAdminController);
adminRoutes.post(
	'/createRecrutador',
	validateTokenAdmin,
	validateBody,
	validateCreateRecrutador,
	createRecrutadorController
);
adminRoutes.delete(
	'/deleteRecrutador/:idRecrutador',
	validateTokenAdmin,
	validateDeleteRecrutador,
	deleteRecrutadorController
);

export default adminRoutes;
