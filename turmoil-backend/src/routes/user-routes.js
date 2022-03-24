import express from 'express';
import { createUser, loginUser } from '../controllers/user-controller.js';
import passportLogin from '../middleware/passport-login-middleware.js';
import { loginSchema, signupSchema } from '../schemas/user-schemas.js';
import validationMiddleware from '../middleware/validation-middleware.js';

const userRouter = express.Router();

userRouter.post('/create', validationMiddleware(signupSchema), createUser);
userRouter.post('/login', validationMiddleware(loginSchema), passportLogin, loginUser);

export default userRouter;
