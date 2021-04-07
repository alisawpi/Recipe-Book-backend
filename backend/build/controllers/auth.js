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
const user_1 = __importDefault(require("../models/user"));
//import jwt from 'jsonwebtoken'; 
const bcrypt_1 = __importDefault(require("bcrypt"));
const authRouter = express_1.default.Router();
/* SIGNUP */
authRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userParams = req.body;
    const username = userParams.username;
    const password = userParams.password;
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    const newUser = new user_1.default({
        username: username,
        password: hash
    });
    yield newUser.save();
    res.status(201).end();
}));
/* LOGIN */
authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginParams = req.body;
    const username = loginParams.username;
    const password = loginParams.password;
    const user = yield user_1.default.findOne({ username: username });
    console.log(user);
    if (!user) {
        res.status(404).end();
        return;
    }
    const hash = user.password;
    const verifyPwd = yield bcrypt_1.default.compare(password, hash);
    console.log(verifyPwd);
    if (!verifyPwd) {
        res.status(401).end();
        return;
    }
    res.status(200).end();
}));
/* LOGOUT */
exports.default = authRouter;
