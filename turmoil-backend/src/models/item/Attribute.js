import Sequelize from 'sequelize';
import sequelize from '../../configs/database.js';

const Attribute = sequelize.define('attribute', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  primaryValue: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  secondaryValue: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  tertiaryValue: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});

export default Attribute;
