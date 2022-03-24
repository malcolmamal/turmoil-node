import express from 'express';
import { state, equip, unequip } from '../controllers/character-controller.js';
import passportAuthorized from '../middleware/passport-jwt-middleware.js';

const characterRouter = express.Router();

characterRouter.get('/state', passportAuthorized, state);
characterRouter.get('/equip/:item', passportAuthorized, equip);
characterRouter.get('/unequip/:item', passportAuthorized, unequip);

export default characterRouter;
