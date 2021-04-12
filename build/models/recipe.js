"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recipeSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const RecipeModel = mongoose_1.default.model('Recipe', recipeSchema);
exports.default = RecipeModel;
