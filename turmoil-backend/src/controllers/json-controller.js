import { StatusCodes } from 'http-status-codes';
import JavaServerService from '../services/java-server-service.js';

export const itemToStash = async (req, res) => {
  const result = await JavaServerService.itemToStash(req.body);

  res.status(StatusCodes.CREATED).send(result);
};

export const generateItem = async (req, res) => {
  const { boost } = req.params;
  const result = await JavaServerService.generateItem(boost);

  res.status(StatusCodes.CREATED).send(result);
};

export const fetchItem = async (req, res) => {
  const { item } = req.params;
  const result = await JavaServerService.fetchItem(item);

  res.status(StatusCodes.CREATED).send(result);
};
