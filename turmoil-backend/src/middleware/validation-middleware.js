import { StatusCodes } from 'http-status-codes';

const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    const { details } = error;
    const errors = details.map((i) => ({ error: i.message }));
    res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

export default validationMiddleware;
