import startServer from './src/app.js';
import Logger from './src/utils/logger.js';

const port = process.env.TURMOIL_BACKEND_PORT || 3030;
const hostname = process.env.TURMOIL_BACKEND_HOSTNAME || '127.0.0.1';

Logger.log("Starting server on port", port);

startServer(port, hostname);
