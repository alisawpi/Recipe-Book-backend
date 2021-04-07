import axios from 'axios';
import { Recipe } from '../types'
const baseURL = '/api/recipes'

export const createRecipe = async (recipe: Recipe) => {
    const response = await axios.post(baseURL, recipe ); 
    return response; 
}