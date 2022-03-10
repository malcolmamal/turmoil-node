import { dbConfig } from './application.js';

const config = dbConfig;
config.dialect = dbConfig.options.dialect;

export default config;
