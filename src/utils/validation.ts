/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/*STRING */
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseStringField = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing field: ${name}`);
    }
    return name;
};

export const parseStringArray = (array: any): string[] => {
    if (!array || !Array.isArray(array) || !array.every(item => typeof item === 'string')) {
        throw new Error(`Incorrect or missing field: ${name}`);
    }
    return array as string[];
};


/*VALIDATE NEW PATIENT INFO */
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
interface NewRecipeInfo {
    title: string, 
    ingredients: string[], 
    directions: string
}
export const validateRecipe = (object: any): NewRecipeInfo => {
    return {
        title: parseStringField(object.title),
        ingredients: parseStringArray(object.ingredients),
        directions: parseStringField(object.directions)
    };
};
