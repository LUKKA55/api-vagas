import { redis } from './config/redis.config';
import Redis from 'ioredis';

export const redisConnection = {
	client: null as unknown as Redis,

	async connection(): Promise<void> {
		this.client = redis;
	},

	async disconnection(): Promise<void> {
		this.client.disconnect();
		this.client = null as any;
	},
};
