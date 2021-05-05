import mongoose from 'mongoose';
import { Rating } from '../types';

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Recipe'
    },
    rating: Number
}); 

const RatingModel: mongoose.Model<Rating> = mongoose.model('Rating', ratingSchema); 
export default RatingModel;