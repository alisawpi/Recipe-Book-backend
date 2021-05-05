import express from 'express';
import Recipe from '../models/recipe';
import Rating from '../models/rating';
import mongoose from 'mongoose';
import { validateRecipe, validateUserToken, parseNumberField } from '../utils/validation';

const recipeRouter = express.Router();

/* URL /api/recipes */

/* GET ALL RECIPES */
recipeRouter.get('/', async (_req, res) => {
    const recipes = await Recipe.aggregate([
        {
            $lookup: {
                from: 'ratings',
                let: { recipe_id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$recipe", "$$recipe_id"] } } },
                    { $project: { _id: 0 } }
                ],
                as: 'rating_res'
            }
        }, 
        {$set: {rating: {$avg: "$rating_res.rating"}}}, 
        {$project: {rating_res: 0}}
    ]);
    res.json(recipes);
});
/* GET RECIPE BY ID */
recipeRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'ratings',
                let: { recipe_id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$recipe", "$$recipe_id"] } } },
                    { $project: { _id: 0 } }
                ],
                as: 'rating_res'
            }
        }, 
        {$set: {rating: {$avg: "$rating_res.rating"}}}, 
        {$project: {rating_res: 0}}
    ]);
    res.json(recipe);
});
/* RATE RECIPE BY ID */
recipeRouter.post('/:id/rate', async (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        res.status(400).end();
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const rating = parseNumberField(req.body.rating);
    const user = validateUserToken(req.body);
    const recipeToRate = await Recipe.findById(id);
    if (!recipeToRate) {
        res.status(404).end();
        return;
    }
    const ratingInfo = { user: user.id, recipe: id, rating: rating };
    const foundOldRating = await Rating.updateOne({ user: user.id, recipe: id }, { rating: rating });
    if (foundOldRating.n > 0) {
        res.status(200).send(ratingInfo);
        return;
    }
    const newRating = new Rating(ratingInfo);
    await newRating.save();
    res.status(201).send(ratingInfo);

});
/* CREATE RECIPE WITH POST */
recipeRouter.post('/', async (req, res) => {
    const creator = validateUserToken(req.body);
    let recipeInfo = validateRecipe(req.body);
    recipeInfo = { ...recipeInfo, creator: creator.id };
    const newRecipe = new Recipe(recipeInfo);
    await newRecipe.save();
    res.status(201).send(recipeInfo);
});

/* EDIT RECIPE WITH POST */
recipeRouter.post('/:id', async (req, res) => {
    const id = req.params.id;
    const user = validateUserToken(req.body);
    const newRecipeInfo = validateRecipe(req.body);
    const recipeToUpdate = await Recipe.findById(id);
    if (!recipeToUpdate) {
        res.status(404).end();
        return;
    }
    if (recipeToUpdate.creator.toString() !== user.id) {
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
    if (recipeToDelete.creator.toString() !== user.id) {
        res.status(401).end();
        return;
    }
    await Recipe.findByIdAndDelete(id);
    res.status(200).end();
});


export default recipeRouter;
