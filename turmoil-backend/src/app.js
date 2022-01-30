import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './configs/database.js';
import userRouter from './routes/userRoutes.js';
import instanceRouter from './routes/instanceRoutes.js';
import Logger from './utils/logger.js';
import createErrorMiddleware from './middleware/errorMiddleware.js';

// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

const startServer = (port, hostname) => {
  const app = express();

  app.use(cors());

  // app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
  app.use(bodyParser.json()); // application/json

  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  app.use('/user', userRouter);
  app.use('/instance', instanceRouter);

  app.use(createErrorMiddleware({ logger: { error: console.error } }));

  // app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).send('Something broke!');
  // });

  sequelize.sync({ force: false })
    .then(() => {
      app.listen(port, hostname);
    })
    .catch((err) => {
      Logger.log(err);
    });

  Logger.log('JavaServerService started');
};

export default startServer;
