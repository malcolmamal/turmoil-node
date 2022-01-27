import { Sequelize } from 'sequelize';

// https://sequelize.org/master/manual/model-basics.html

const sequelize = new Sequelize('turmoil', 'root', 'nopass', {
  dialect: 'mysql',
  host: 'localhost',
  dialectOptions: {
    // Your mysql2 options here
  },
});

export default sequelize;
