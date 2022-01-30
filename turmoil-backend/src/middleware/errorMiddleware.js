const createErrorMiddleware = ({ logger }) => function errorMiddleware(error, req, res, next) {
  console.log('here in error middleware');
  if (res.headersSent) {
    next(error);
  } else {
    logger.error(error.message);
    res.status(500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'prod' ? null : { stack: error.stack }),
    });
  }
};

export default createErrorMiddleware;
