import { DataSource } from 'typeorm';
import config from './typeorm.config';

export const dataSource = new DataSource(config);
