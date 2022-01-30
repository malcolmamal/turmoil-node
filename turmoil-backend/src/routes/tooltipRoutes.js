import express from 'express';
import tooltip from '../controllers/tooltipController.js';

const tooltipRouter = express.Router();

tooltipRouter.post('/:type/:ident', tooltip);

export default tooltipRouter;
