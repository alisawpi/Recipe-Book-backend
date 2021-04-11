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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../utils/config"));
const validation_1 = require("../utils/validation");
const authRouter = express_1.default.Router();
/* SIGNUP */
authRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserInfo = validation_1.validateUserInfo(req.body);
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(newUserInfo.password, saltRounds);
    newUserInfo.password = hash;
    const newUser = new user_1.default(newUserInfo);
    yield newUser.save();
    res.status(201).end();
}));
/* LOGIN */
authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginParams = validation_1.validateUserInfo(req.body);
    const username = loginParams.username;
    const password = loginParams.password;
    const user = yield user_1.default.findOne({ username: username });
    if (!user || typeof user.id !== 'string') {
        res.status(404).end();
        return;
    }
    const hash = user.password;
    const verifyPwd = yield bcrypt_1.default.compare(password, hash);
    if (!verifyPwd) {
        res.status(401).end();
        return;
    }
    if (!config_1.default.SECRET) {
        throw 'Json token secret undefined';
    }
    const userToken = {
        username: user.username,
        id: user.id
    };
    const token = jsonwebtoken_1.default.sign(userToken, config_1.default.SECRET);
    res.send(token);
}));
/* DELETE USER check that its the user himnself logged in*/
authRouter.post('/:id/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield user_1.default.findByIdAndDelete(id);
    res.status(200).end();
}));
exports.default = authRouter;
