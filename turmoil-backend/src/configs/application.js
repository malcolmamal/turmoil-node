const env = process.env.NODE_ENV || 'dev';

const prodApplication = {
  env: process.env.NODE_ENV || 'dev',
  auth: {
    secret: process.env.APP_SECRET || 'turmoil-secret-key',
  },
  db: {
    database: process.env.DB_NAME || 'turmoil',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'nopass',
    options: {
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      dialectOptions: {
        // Your postgres options here
      },
    },
  },
};

const testApplication = {
  db: {
    database: 'turmoil',
    username: 'postgres',
    password: 'nopass',
    options: {
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      dialectOptions: {
        // Your postgres options here
      },
    },
  },
};

const appConfig = env === 'test' ? { ...prodApplication, ...testApplication } : prodApplication;

export const dbConfig = appConfig.db;
export default appConfig;
