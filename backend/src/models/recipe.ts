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
    likes: Number, 
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const RecipeModel: mongoose.Model<Recipe> =  mongoose.model('Recipe', recipeSchema);
export default RecipeModel;