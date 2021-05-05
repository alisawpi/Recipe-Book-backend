import mongoose from 'mongoose';
import { Recipe } from '../types';

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    cookTime: {
        type: String, 
        required: true
    },
    imgURL: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
});

const RecipeModel: mongoose.Model<Recipe> = mongoose.model('Recipe', recipeSchema);
export default RecipeModel;