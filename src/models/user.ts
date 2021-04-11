import mongoose from 'mongoose'; 
import uniqueValidator from 'mongoose-unique-validator'; 
import { User } from '../types';

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true
    }, 
    password: {
        type: String, 
        required: true
    },
    savedRecipes: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Recipe'
    }
}); 
userSchema.plugin(uniqueValidator);
const User: mongoose.Model<User> = mongoose.model('User', userSchema);

export default User; 
