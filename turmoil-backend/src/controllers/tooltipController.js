import JavaServerService from '../services/javaServerService.js';

const tooltip = async (req, res, next) => {
  console.log('in the tooltip');
  const { type, ident } = req.params;
  if (!type || !ident) {
    const error = new Error('tooltip -> type or ident param is missing');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const result = await JavaServerService.tooltip(type, ident);

    return res.status(201).send(result);
  } catch (err) {
    console.log('throwing from tooltip');
    return next(err);
  }
};

export default tooltip;
