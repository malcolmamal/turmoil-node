import { StatusCodes } from 'http-status-codes';
import Logger from '../utils/logger.js';
import JavaServerService from '../services/javaServerService.js';

export const initializeStash = async (req, res) => {
  const result = await JavaServerService.initializeStash();

  res.status(StatusCodes.CREATED).send(result);
};

export const initializeEquipment = async (req, res) => {
  const result = await JavaServerService.initializeEquipment();

  res.status(StatusCodes.CREATED).send(result);
};

export const instanceActionOnPosition = async (req, res, next) => {
  Logger.log('Will initialize stash');
  const { position } = req.params;
  if (!position) {
    const error = new Error('instanceActionOnPosition -> position param is missing');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    return next(error);
  }

  const result = await JavaServerService.instanceActionOnPosition(position);

  return res.status(StatusCodes.CREATED).send(result);
};

export const initializeEnemyUnits = async (req, res) => {
  const result = await JavaServerService.initializeEnemyUnits();

  res.status(StatusCodes.CREATED).send(result);
};

export const initializeFriendlyUnits = async (req, res) => {
  const result = await JavaServerService.initializeFriendlyUnits();

  res.status(StatusCodes.CREATED).send(result);
};
