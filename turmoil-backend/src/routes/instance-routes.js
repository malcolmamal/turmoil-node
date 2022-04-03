import express from 'express';
import {
  initializeEnemyUnits,
  initializeEquipment,
  initializeFriendlyUnits,
  initializeStash,
  initializeStashFromJava,
  instanceActionOnPosition,
} from '../controllers/instance-controller.js';
import passportAuthorized from '../middleware/passport-jwt-middleware.js';

const instanceRouter = express.Router();

// instanceRouter.use(passportAuthorized); // what is the order

// instanceRouter.get('/initializeStash', passportAuthorized, initializeStash);
instanceRouter.get(
  '/initializeStash',
  passportAuthorized,
  initializeStashFromJava,
);
instanceRouter.get(
  '/initializeEquipment',
  passportAuthorized,
  initializeEquipment,
);
instanceRouter.get(
  '/instanceActionOnPosition/:position',
  passportAuthorized,
  instanceActionOnPosition,
);
instanceRouter.post(
  '/initializeEnemyUnits',
  passportAuthorized,
  initializeEnemyUnits,
);
instanceRouter.post(
  '/initializeFriendlyUnits',
  passportAuthorized,
  initializeFriendlyUnits,
);

export default instanceRouter;
