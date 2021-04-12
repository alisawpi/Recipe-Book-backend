/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { UserToken } from '../types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseStringField = (name: any): string => {
    if (!name || !isString(name)) {
        throw { name: 'Incorrect or missing field' };
    }
    return name;
};

export const parseStringArray = (array: any): string[] => {
    if (!array || !Array.isArray(array) || !array.every(item => typeof item === 'string')) {
        throw { name: 'Incorrect or missing field' };
    }
    return array as string[];
};

interface NewUserInfo {
    username: string, 
    password: string
}
export const validateUserInfo = (object: any): NewUserInfo => {
    return {
        username: parseStringField(object.username),
        password: parseStringField(object.password)
    };
};
export const validateUserToken = (object: any): UserToken => {
    if (!object.user) throw {name: 'No token!'};
    return {
        username: parseStringField(object.user.username),
        id: parseStringField(object.user.id) 
    };
};
interface NewRecipeInfo {
    title: string, 
    ingredients: string[], 
    directions: string, 
    creator: string
}
export const validateRecipe = (object: any): NewRecipeInfo => {
    return {
        title: parseStringField(object.title),
        ingredients: parseStringArray(object.ingredients),
        directions: parseStringField(object.directions), 
        creator: parseStringField(object.user.id)
    };
};
