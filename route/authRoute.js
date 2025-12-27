//to create routes we use express
import express from 'express';
import { signup, login, logout } from '../controller/authController.js';

//we have created a router instance
const authRouter = express.Router();

//we used post method for signup ,login and logout, so that we can send data in request body 

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

export default authRouter;