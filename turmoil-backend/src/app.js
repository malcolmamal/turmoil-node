import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Server from './server.js';
import sequelize from './configs/database.js';
import router from './routes/userRoutes.js';
import isAuthorized from './middleware/authMiddleware.js';
import Logger from './utils/logger.js';

// in case of doubled request, favicon workaround
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// or instead: res.status(204).end()
// https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico/35408810#35408810

const startServer = (port, hostname) => {
  const app = express();

  app.use(cors());

  // app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
  app.use(bodyParser.json()); // application/json

  app.use('/user', router);

  app.get('/initializeStash', isAuthorized, (req, res) => {
    Logger.log('Will initialize stash');
    Server.initializeStash()
      .then((r) => {
        res.send(r);
        Logger.log('Output sent');
      });
  });

  app.use((error, req, res) => {
    Logger.log('got error', error);
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    res.status(status).json({ message, data });
  });

  sequelize.sync({ force: false })
    .then(() => {
      app.listen(port, hostname);
    })
    .catch((err) => {
      Logger.log(err);
    });

  Logger.log('Server started');
};

export default startServer;
