import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import jsonRouter from './routes/json-routes.js';
import tooltipRouter from './routes/tooltipRoutes.js';
import instanceRouter from './routes/instanceRoutes.js';
import characterRouter from './routes/characterRoutes.js';
import Logger from './utils/logger.js';
import createErrorMiddleware from './middleware/errorMiddleware.js';
import initializePassport from './configs/passport/passport.js';
import itemRouter from './routes/item-routes.js';
import initializeSequelize from './provider/db/sequelize.js';

// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

const createApp = async () => {
  await initializeSequelize();
  initializePassport();

  const app = express();

  app.use(cors());

  // app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
  app.use(bodyParser.json()); // application/json

  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  if (['prod', 'ci'].includes(process.env.NODE_ENV)) {
    app.use(express.static('../turmoil/frontend-build'));

    // the rest in 132 (s.grider) at 11:20
  }

  app.use('/user', userRouter);
  app.use('/item', itemRouter);
  app.use('/json', jsonRouter);
  app.use('/tooltip', tooltipRouter);
  app.use('/instance', instanceRouter);
  app.use('/character', characterRouter);

  // eslint-disable-next-line no-console
  app.use(createErrorMiddleware({ logger: { error: console.error, log: Logger.log } }));

  Logger.log('JavaServerService started');

  return app;
};

export default createApp;
