import express from 'express';
import Recipe from '../models/recipe';

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
    const id = req.params.id
    const recipe = await Recipe.findById(id)
    res.json(recipe)
})
/* CREATE RECIPE WITH POST */
recipeRouter.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);
    const newRecipe = new Recipe({
        title: body.title,
        ingredients: body.ingredients,
        directions: body.directions
    });
    await newRecipe.save();
    res.status(201).end();
});

/* EDIT RECIPE WITH POST */
recipeRouter.post('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    const newRecipe = {
        title: body.title, 
        ingredients: body.ingredients, 
        directions: body.directions
    }
    await Recipe.findByIdAndUpdate(id, newRecipe)
    res.status(200).send(newRecipe)
})

/* DELETE BY ID  */

recipeRouter.post('/:id/delete', async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    await Recipe.findByIdAndDelete(id)
    res.status(200).end()
})


export default recipeRouter;
