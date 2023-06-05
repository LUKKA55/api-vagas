import { Express } from 'express';
import adminRoutes from '../../app/features/admin/routes';
import { recrutadorRoutes } from '../../app/features/recrutador/routes';
import { candidatoRoutes } from '../../app/features/candidato/routes';

export const registerRoutes = (api: Express) => {
	try {
		api.use('/admin', adminRoutes);
		api.use('/recrutador', recrutadorRoutes);
		api.use('/candidato', candidatoRoutes);
	} catch (error) {
		return console.log(`ERRO Config Routes ${error}`);
	}
};
