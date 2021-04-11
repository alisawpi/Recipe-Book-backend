import express from 'express';
import Recipe from '../models/recipe';
import { validateRecipe } from '../utils/validation';

const recipeRouter = express.Router();

/*PING ENDPOINT */
recipeRouter.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

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
    const recipeInfo = validateRecipe(req.body);
    const newRecipe = new Recipe(recipeInfo);
    await newRecipe.save();
    res.status(201).end();
});

/* EDIT RECIPE WITH POST */
recipeRouter.post('/:id', async (req, res) => {
    const id = req.params.id;
    const newRecipeInfo = validateRecipe(req.body);
    await Recipe.findByIdAndUpdate(id, newRecipeInfo);
    res.status(200).send(newRecipeInfo);
});

/* DELETE BY ID  */

recipeRouter.post('/:id/delete', async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    await Recipe.findByIdAndDelete(id);
    res.status(200).end();
});


export default recipeRouter;
