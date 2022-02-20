import http from 'http';
import createApp from './app.js';
import Logger from './utils/logger.js';

function setupGracefulShutdown(server) {
  async function exitHandler() {
    server.close();

    Logger.log('Server successfully closed.');
  }

  // when app is closing
  process.on('exit', exitHandler);

  // catches ctrl+c
  process.on('SIGINT', exitHandler);

  // catches "kill pid"
  process.on('SIGUSR2', exitHandler);

  process.on('uncaughtException', () => process.exit());
}

export function startServer(host = 'localhost', port = 3030, options = {}) {
  const server = http.createServer(
    createApp(),
  );

  server.listen(port, host, () => {
    Logger.log(`Server is ready to handle connection on ${host}:${port}`);
  });

  if (options.gracefulShutdown) {
    setupGracefulShutdown(server);
  }
}

export default startServer;
