/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { UserTokenInfo } from '../types';

const info = (...params: any[]) => {
    console.log(...params);
};

const error = (...params: any[]) => {
    console.log(...params);
};

export const logger = {
    info, error
};
export const unknownEndpoint = (_request: any, response: any) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (error: any, _request: any, response: any, next: any) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError' || error.name === 'No token!') {
        console.log('HERE');
        return response.status(401).json({
            error: 'invalid token'
        });
    } else if (error.name === 'Incorrect or missing field' || error.name === 'Missing information!') {
        return response.status(404).json({error: error.name});
    }
    next(error);
};

export const tokenExtractor = (req: any, _res: any, next: any) => {
    if (!config.SECRET) {
        throw 'Json token secret undefined';
    }
    if (!req.headers.authorization) {
        next();
    } else {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.SECRET) as UserTokenInfo;
        req.body = {
            ...req.body,
            user: {
                username: decodedToken.username, 
                id: decodedToken.id
            }
        };
        console.log(decodedToken);
        next();
    }

};

