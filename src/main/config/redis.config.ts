import { Redis } from 'ioredis';
import { envs } from '../../app/envs/envsObject';

export const redis = new Redis({
	port: envs.port_redis,
	host: envs.host_redis,
	username: 'default',
	password: envs.password_redis,
});
