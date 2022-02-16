import express from 'express';
import passport from 'passport';
import {
  initializeEnemyUnits,
  initializeEquipment,
  initializeFriendlyUnits,
  initializeStash,
  instanceActionOnPosition,
} from '../controllers/instanceController.js';
import isAuthorized from '../middleware/authMiddleware.js';
import passportAuthorized from '../middleware/passportJwtMiddleware.js';

const instanceRouter = express.Router();

instanceRouter.get('/initializeStash', passport.authenticate('jwt', { session: false }), initializeStash);
instanceRouter.get('/initializeEquipment', passportAuthorized, initializeEquipment);
instanceRouter.get('/instanceActionOnPosition/:position', isAuthorized, instanceActionOnPosition);
instanceRouter.post('/initializeEnemyUnits', isAuthorized, initializeEnemyUnits);
instanceRouter.post('/initializeFriendlyUnits', isAuthorized, initializeFriendlyUnits);

export default instanceRouter;
