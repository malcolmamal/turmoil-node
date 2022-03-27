import sequelize from '../../configs/database.js';
import Logger from '../../utils/logger.js';
import Attribute from '../../models/item/Attribute.js';
import Item from '../../models/item/Item.js';
import User from '../../models/User.js';

Attribute.belongsTo(Item, {
  constraints: true,
  onDelete: 'CASCADE',
});
Item.hasMany(Attribute);
Item.belongsTo(User);

const initializeSequelize = async () => {
  try {
    await sequelize.authenticate();
    Logger.log('Connection has been established successfully.');
    await sequelize.sync({
      force: false,
      logging: false,
    });
  } catch (err) {
    Logger.log('Database error', err);
  }
};

export default initializeSequelize;
