import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './configs/database.js';
import userRouter from './routes/userRoutes.js';
import tooltipRouter from './routes/tooltipRoutes.js';
import instanceRouter from './routes/instanceRoutes.js';
import characterRouter from './routes/characterRoutes.js';
import Logger from './utils/logger.js';
import createErrorMiddleware from './middleware/errorMiddleware.js';
import initializePassport from './configs/passportJwt.js';

// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

const startServer = async (port, hostname) => {
  try {
    await sequelize.authenticate();

    Logger.log('Connection has been established successfully.');
  } catch (error) {
    Logger.log('Unable to connect to the database', error);

    return;
  }

  initializePassport();

  const app = express();

  app.use(cors());

  // app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
  app.use(bodyParser.json()); // application/json

  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  app.use('/user', userRouter);
  app.use('/tooltip', tooltipRouter);
  app.use('/instance', instanceRouter);
  app.use('/character', characterRouter);

  app.use(createErrorMiddleware({ logger: { error: console.error, log: Logger.log } }));

  // app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).send('Something broke!');
  // });

  await sequelize.sync({ force: false });
  app.listen(port, hostname);

  Logger.log('JavaServerService started');
};

export default startServer;
