import { StatusCodes } from 'http-status-codes';
import Logger from '../utils/logger.js';
import JavaServerService from '../services/java-server-service.js';
import fetchFromStashForUser from '../services/item-service.js';

export const initializeStash = async (req, res) => {
  const items = await fetchFromStashForUser(req.account);
  const mappedItems = items.flatMap((item) => { const newItem = JSON.parse(JSON.stringify(item)); newItem.ident = `ident-${newItem.id}`; return newItem; });

  // TODO: send them to java server and fetch them from that place, when we generate them from node, they are missing some stuff
  // TODO: do not generate ident here

  res.status(StatusCodes.OK).send({ items: mappedItems });
};

export const initializeStashFromJava = async (req, res) => {
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
