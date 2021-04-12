import express from 'express';
import Recipe from '../models/recipe';
import { validateRecipe, validateUserToken } from '../utils/validation';

const recipeRouter = express.Router();

/* URL /api/recipes */

/* GET ALL RECIPES */
recipeRouter.get('/', async (_req, res) => {
    const recipes = await Recipe.find({});
    res.json(recipes);
});
/* GET RECIPE BY ID */
recipeRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    res.json(recipe);
});
/* CREATE RECIPE WITH POST */
recipeRouter.post('/', async (req, res) => {
    const creator = validateUserToken(req.body);
    let recipeInfo = validateRecipe(req.body); 
    recipeInfo = {...recipeInfo, creator: creator.id};
    const newRecipe = new Recipe(recipeInfo);
    await newRecipe.save();
    res.status(201).end();
});

/* EDIT RECIPE WITH POST */
recipeRouter.post('/:id', async (req, res) => {
    const id = req.params.id;
    const user = validateUserToken(req.body); 
    const newRecipeInfo = validateRecipe(req.body);
    const recipeToUpdate = await Recipe.findById(id);
    if (!recipeToUpdate){
        res.status(404).end();
        return; 
    }
    if (recipeToUpdate.creator.toString() !== user.id){
        res.status(401).end();
        return;
    }
    await Recipe.findByIdAndUpdate(id, newRecipeInfo);
    res.status(200).send(newRecipeInfo);
});

/* DELETE BY ID  */

recipeRouter.post('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const user = validateUserToken(req.body);
    const recipeToDelete = await Recipe.findById(id); 
    if (!recipeToDelete) {
        res.status(404).end(); 
        return; 
    }
    if (recipeToDelete.creator.toString() !== user.id){
        res.status(401).end(); 
        return; 
    }
    await Recipe.findByIdAndDelete(id);
    res.status(200).end();
});


export default recipeRouter;
