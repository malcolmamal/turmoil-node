import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';
import passportLogin from '../middleware/passportLoginMiddleware.js';

const userRouter = express.Router();

userRouter.put('/create', createUser);
userRouter.post('/login', passportLogin, loginUser);

export default userRouter;
