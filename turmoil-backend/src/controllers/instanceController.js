import Logger from '../utils/logger.js';
import JavaServerService from '../services/javaServerService.js';

export const initializeStash = async (req, res) => {
  Logger.log('Will initialize stash');
  Logger.log('user found', req.user.name);

  const result = await JavaServerService.initializeStash();

  res.status(201).send(result);
};

export const initializeEquipment = async (req, res) => {
  const result = await JavaServerService.initializeEquipment();

  res.status(201).send(result);
};

export const instanceActionOnPosition = async (req, res, next) => {
  Logger.log('Will initialize stash');
  const { position } = req.params;
  if (!position) {
    const error = new Error('instanceActionOnPosition -> position param is missing');
    error.statusCode = 401;
    return next(error);
  }

  const result = await JavaServerService.instanceActionOnPosition(position);

  return res.status(201).send(result);
};

export const initializeEnemyUnits = async (req, res) => {
  const result = await JavaServerService.initializeEnemyUnits();

  res.status(201).send(result);
};

export const initializeFriendlyUnits = async (req, res) => {
  const result = await JavaServerService.initializeFriendlyUnits();

  res.status(201).send(result);
};
