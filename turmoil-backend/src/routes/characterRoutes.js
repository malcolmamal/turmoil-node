import express from 'express';
import { state, equip, unequip } from '../controllers/characterController.js';

const characterRouter = express.Router();

characterRouter.get('/state', state);
characterRouter.get('/equip/:item', equip);
characterRouter.get('/unequip/:item', unequip);

export default characterRouter;
