"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecipe = exports.validateUserToken = exports.validateUserInfo = exports.parseStringArray = void 0;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseStringField = (name) => {
    if (!name || !isString(name)) {
        throw { name: 'Incorrect or missing field' };
    }
    return name;
};
const parseStringArray = (array) => {
    if (!array || !Array.isArray(array) || !array.every(item => typeof item === 'string')) {
        throw { name: 'Incorrect or missing field' };
    }
    return array;
};
exports.parseStringArray = parseStringArray;
const validateUserInfo = (object) => {
    return {
        username: parseStringField(object.username),
        password: parseStringField(object.password)
    };
};
exports.validateUserInfo = validateUserInfo;
const validateUserToken = (object) => {
    if (!object.user)
        throw { name: 'No token!' };
    return {
        username: parseStringField(object.user.username),
        id: parseStringField(object.user.id)
    };
};
exports.validateUserToken = validateUserToken;
const validateRecipe = (object) => {
    return {
        title: parseStringField(object.title),
        ingredients: exports.parseStringArray(object.ingredients),
        directions: parseStringField(object.directions),
        creator: parseStringField(object.user.id)
    };
};
exports.validateRecipe = validateRecipe;
