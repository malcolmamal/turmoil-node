import express from 'express';
import tooltip from '../controllers/tooltip-controller.js';
import passportAuthorized from '../middleware/passport-jwt-middleware.js';

const tooltipRouter = express.Router();

tooltipRouter.post('/:type/:ident', passportAuthorized, tooltip);

export default tooltipRouter;
