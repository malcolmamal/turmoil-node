import { StatusCodes } from 'http-status-codes';

const validationMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  req.body = value;

  if (!error) {
    next();
  } else {
    const { details } = error;
    const errors = details.reduce((acc, field) => {
      const { key } = field.context;
      acc[key] = acc[key] || { errors: [] };
      acc[key].errors.push(field.message);
      return acc;
    }, {});

    res.status(StatusCodes.BAD_REQUEST).json({ ...errors });
  }
};

export default validationMiddleware;
