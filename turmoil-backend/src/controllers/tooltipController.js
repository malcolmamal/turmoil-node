import { StatusCodes } from 'http-status-codes';
import JavaServerService from '../services/javaServerService.js';
import Logger from '../utils/logger.js';

const tooltip = async (req, res, next) => {
  Logger.log('in the tooltip');
  const { type, ident } = req.params;
  if (!type || !ident) {
    const error = new Error('tooltip -> type or ident param is missing');
    error.statusCode = StatusCodes.UNAUTHORIZED;
    return next(error);
  }

  try {
    const result = await JavaServerService.tooltip(type, ident);

    return res.status(StatusCodes.CREATED).send(result);
  } catch (err) {
    Logger.log('throwing from tooltip');
    return next(err);
  }
};

export default tooltip;
