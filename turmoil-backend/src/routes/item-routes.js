import express from 'express';
import {
  itemFetch,
  itemGenerateAndPersist,
  itemPutToStash,
} from '../controllers/item-controller.js';

const itemRouter = express.Router();

itemRouter.get('/gen', itemGenerateAndPersist);
itemRouter.get('/fetch/:id', itemFetch);
itemRouter.get('/putToStash/:id', itemPutToStash);

export default itemRouter;
