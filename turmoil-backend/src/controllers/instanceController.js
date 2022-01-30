import Logger from '../utils/logger.js';
import JavaServerService from '../services/javaServerService.js';

export const initializeStash = async (req, res) => {
  Logger.log('Will initialize stash');

  const result = await JavaServerService.initializeStash();

  res.status(201).send(result);
};

export const initializeEnemyUnits = async (req, res, next) => {
  Logger.log('in post enemy units');
  const result = await JavaServerService.initializeEnemyUnits();

  // const error = new Error('Something went wrong.');
  // error.statusCode = 401;
  // return next(error);

  res.status(201).send(result);
};
