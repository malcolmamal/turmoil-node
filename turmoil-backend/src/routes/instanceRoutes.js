import express from 'express';
import { initializeEnemyUnits, initializeStash } from '../controllers/instanceController.js';
import isAuthorized from '../middleware/authMiddleware.js';

const instanceRouter = express.Router();

instanceRouter.get('/initializeStash', isAuthorized, initializeStash);
instanceRouter.post('/initializeEnemyUnits', isAuthorized, initializeEnemyUnits);

export default instanceRouter;
