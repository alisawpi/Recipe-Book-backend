import React, { useState } from "react";
import { createRecipe } from '../services/recipes';

const CreateRecipeForm = () => {
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([])
    const [title, setTitle] = useState('')
    const [directions, setDirections] = useState('')

    const addIngredient = () => {
        setIngredients(ingredients.concat(ingredient))
        setIngredient('')
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (!title || !ingredients || !directions) {
            console.log('create a nice message')
            return
        }
        const newRecipe = {
            title: title,
            ingredients: ingredients,
            directions: directions
        }
        createRecipe(newRecipe)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='recipeform-title'>
                <label htmlFor="title">Title</label>
                <input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div className='recipeform-ingredients'>
                <label htmlFor='ingredients'>Ingredients</label>
                <input type='text' value={ingredient} onChange={({ target }) => setIngredient(target.value)} name='ingredients' />
                <button onClick={addIngredient} type="button">add ingredient</button>
                <div>
                    Ingredients: {ingredients.join(' ')}
                </div>
            </div>
            <div className='recipeform-directions'>
                <textarea cols={50} value={directions} onChange={({ target }) => setDirections(target.value)} />
            </div>
            <input type='submit' name='Submit' />
        </form>

    );
}
export default CreateRecipeForm; 