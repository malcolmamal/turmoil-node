import { Sequelize } from 'sequelize';

const sequelizePostgres = new Sequelize('turmoil', 'postgres', 'nopass', {
  dialect: 'postgres',
  host: 'localhost',
  dialectOptions: {
    // Your postgres options here
  },
});

export default sequelizePostgres;
