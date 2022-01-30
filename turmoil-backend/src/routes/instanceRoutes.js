import express from 'express';
import {
  initializeEnemyUnits,
  initializeEquipment,
  initializeFriendlyUnits,
  initializeStash,
  instanceActionOnPosition,
} from '../controllers/instanceController.js';
import isAuthorized from '../middleware/authMiddleware.js';

const instanceRouter = express.Router();

instanceRouter.get('/initializeStash', isAuthorized, initializeStash);
instanceRouter.get('/initializeEquipment', isAuthorized, initializeEquipment);
instanceRouter.get('/instanceActionOnPosition/:position', isAuthorized, instanceActionOnPosition);
instanceRouter.post('/initializeEnemyUnits', isAuthorized, initializeEnemyUnits);
instanceRouter.post('/initializeFriendlyUnits', isAuthorized, initializeFriendlyUnits);

export default instanceRouter;
