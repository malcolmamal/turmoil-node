import express from 'express';
import { state, equip, unequip } from '../controllers/characterController.js';

const userRouter = express.Router();

userRouter.get('/state', state);
userRouter.get('/equip/:item', equip);
userRouter.get('/unequip/:item', unequip);

export default userRouter;
