import Sequelize from 'sequelize';
import sequelize from '../configs/database.js';
import User from './User.js';
import Attribute from './item/Attribute.js';
import Item from './item/Item.js';

const db = {};
db[User.name] = User;
db[Attribute.name] = Attribute;
db[Item.name] = Item;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
