import { StatusCodes } from 'http-status-codes';

const createErrorMiddleware = ({ logger }) =>
  function errorMiddleware(error, req, res, next) {
    logger.log('here in error middleware');
    if (res.headersSent) {
      next(error);
    } else {
      logger.error(error.message);
      res.status(StatusCodes.UNAUTHORIZED);
      res.json({
        message: error.message,
        ...(process.env.NODE_ENV === 'prod' ? null : { stack: error.stack }),
      });
    }
  };

export default createErrorMiddleware;
