import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../envs/envsObject';
import { Token } from '../models/interface/IToken';

export const getIdByToken = (data: string) => {
	const decodedToken = jwt.verify(data, envs.secret as string) as Token;
	return decodedToken.uid;
};
