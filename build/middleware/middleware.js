"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExtractor = exports.errorHandler = exports.unknownEndpoint = exports.logger = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const info = (...params) => {
    console.log(...params);
};
const error = (...params) => {
    console.log(...params);
};
exports.logger = {
    info, error
};
const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
const errorHandler = (error, _request, response, next) => {
    exports.logger.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    }
    else if (error.name === 'Entry missing required fields!') {
        return response.status(400).json({ error: error.name });
    }
    next(error);
};
exports.errorHandler = errorHandler;
const tokenExtractor = (req, _res, next) => {
    if (!config_1.default.SECRET) {
        throw 'Json token secret undefined';
    }
    if (!req.headers.authorization) {
        next();
    }
    else {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        req.body = Object.assign(Object.assign({}, req.body), { user: {
                username: decodedToken.username,
                _id: decodedToken.id
            } });
        next();
    }
};
exports.tokenExtractor = tokenExtractor;
