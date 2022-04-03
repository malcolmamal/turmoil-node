import express from 'express';
import passportAuthorized from '../middleware/passport-jwt-middleware.js';
import {
  fetchItem,
  generateItem,
  itemToStash,
} from '../controllers/json-controller.js';

const jsonRouter = express.Router();

jsonRouter.get('/jsonGenerateItem/:boost?', generateItem);
jsonRouter.post('/jsonItemToStash', passportAuthorized, itemToStash);
jsonRouter.get('/jsonFetchItem/:item', fetchItem);

export default jsonRouter;
