import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';
import config from '../utils/config';
import { UserToken } from '../types';
import { validateUserInfo } from '../utils/validation';
const authRouter = express.Router();

/* SIGNUP */
authRouter.post('/', async (req, res) => {
    const newUserInfo  = validateUserInfo(req.body);
    const saltRounds = 10;
    const hash = await bcrypt.hash(newUserInfo.password, saltRounds);
    newUserInfo.password = hash;
    const newUser = new User(newUserInfo);
    await newUser.save();
    res.status(201).end();
});

/* LOGIN */

authRouter.post('/login', async (req, res) => {
    const loginParams = validateUserInfo(req.body);
    const username = loginParams.username;
    const password = loginParams.password;
    const user = await User.findOne({ username: username });
    if (!user || typeof user.id !== 'string' ){
        res.status(404).end(); 
        return; 
    }
    const hash = user.password; 
    const verifyPwd = await bcrypt.compare(password, hash);
    if (!verifyPwd) {
        res.status(401).end();
        return;
    }
    if (!config.SECRET){
        throw 'Json token secret undefined';
    }
    console.log(user.id);
    const userToken: UserToken = {
        username: user.username, 
        id: user.id
    };
    const token = jwt.sign(userToken, config.SECRET);
    res.send(token);
});

/* DELETE USER check that its the user himnself logged in*/
authRouter.post('/:id/delete', async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).end();
});

export default authRouter; 