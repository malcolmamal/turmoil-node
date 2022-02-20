import express from 'express';
import tooltip from '../controllers/tooltipController.js';
import passportAuthorized from '../middleware/passportJwtMiddleware.js';

const tooltipRouter = express.Router();

tooltipRouter.post('/:type/:ident', passportAuthorized, tooltip);

export default tooltipRouter;
