import sequelize from '../src/configs/database.js';

// teardown
afterAll(async () => await Promise.all([sequelize.close()]));
