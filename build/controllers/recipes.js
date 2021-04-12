"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipe_1 = __importDefault(require("../models/recipe"));
const validation_1 = require("../utils/validation");
const recipeRouter = express_1.default.Router();
/* URL /api/recipes */
/* GET ALL RECIPES */
recipeRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield recipe_1.default.find({});
    res.json(recipes);
}));
/* GET RECIPE BY ID */
recipeRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const recipe = yield recipe_1.default.findById(id);
    res.json(recipe);
}));
/* CREATE RECIPE WITH POST */
recipeRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creator = validation_1.validateUserToken(req.body);
    let recipeInfo = validation_1.validateRecipe(req.body);
    recipeInfo = Object.assign(Object.assign({}, recipeInfo), { creator: creator.id });
    const newRecipe = new recipe_1.default(recipeInfo);
    yield newRecipe.save();
    res.status(201).end();
}));
/* EDIT RECIPE WITH POST */
recipeRouter.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = validation_1.validateUserToken(req.body);
    const newRecipeInfo = validation_1.validateRecipe(req.body);
    const recipeToUpdate = yield recipe_1.default.findById(id);
    if (!recipeToUpdate) {
        res.status(404).end();
        return;
    }
    if (recipeToUpdate.creator.toString() !== user.id) {
        res.status(401).end();
        return;
    }
    yield recipe_1.default.findByIdAndUpdate(id, newRecipeInfo);
    res.status(200).send(newRecipeInfo);
}));
/* DELETE BY ID  */
recipeRouter.post('/:id/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = validation_1.validateUserToken(req.body);
    const recipeToDelete = yield recipe_1.default.findById(id);
    if (!recipeToDelete) {
        res.status(404).end();
        return;
    }
    if (recipeToDelete.creator.toString() !== user.id) {
        res.status(401).end();
        return;
    }
    yield recipe_1.default.findByIdAndDelete(id);
    res.status(200).end();
}));
exports.default = recipeRouter;
