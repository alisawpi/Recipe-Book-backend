import mongoose from 'mongoose'; 

export interface User extends mongoose.Document {
    username: string, 
    password: string, 
    savedRecipes: string[]
}

export interface Recipe extends mongoose.Document {
    title: string
    ingredients: string[]
    directions: string
    likes: number, 
    creator: string
}
export interface UserTokenInfo {
    username: string, 
    id: string
}
export interface Rating extends mongoose.Document {
    user: string, 
    recipe: string, 
    rating: number
}