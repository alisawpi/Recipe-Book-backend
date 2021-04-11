"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecipe = exports.validateUserInfo = exports.parseStringArray = void 0;
/*STRING */
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseStringField = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing field: ${name}`);
    }
    return name;
};
const parseStringArray = (array) => {
    if (!array || !Array.isArray(array) || !array.every(item => typeof item === 'string')) {
        throw new Error(`Incorrect or missing field: ${name}`);
    }
    return array;
};
exports.parseStringArray = parseStringArray;
const validateUserInfo = (object) => {
    return {
        username: parseStringField(object.name),
        password: parseStringField(object.password)
    };
};
exports.validateUserInfo = validateUserInfo;
const validateRecipe = (object) => {
    return {
        title: parseStringField(object.title),
        ingredients: exports.parseStringArray(object.ingredients),
        directions: parseStringField(object.directions)
    };
};
exports.validateRecipe = validateRecipe;
