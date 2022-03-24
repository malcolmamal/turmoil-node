import { StatusCodes } from 'http-status-codes';
import JavaServerService from '../services/java-server-service.js';

export const state = async (req, res) => {
  const result = await JavaServerService.characterState();

  res.status(StatusCodes.CREATED).send(result);
};

export const equip = async (req, res, next) => {
  const { item } = req.params;
  if (!item) {
    const error = new Error('equip -> item param is missing');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    return next(error);
  }

  const result = await JavaServerService.characterEquipItem(item);

  return res.status(StatusCodes.CREATED).send(result);
};

export const unequip = async (req, res, next) => {
  const { item } = req.params;
  if (!item) {
    const error = new Error('equip -> item param is missing');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    return next(error);
  }

  const result = await JavaServerService.characterUnequipItem(item);

  return res.status(StatusCodes.CREATED).send(result);
};
