import Sequelize from 'sequelize';
import sequelize from '../../configs/database.js';

const Item = sequelize.define('item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  itemCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  itemName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  durability: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  priceValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  itemType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rarity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isCrafted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isEquipped: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isStashed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // stash: null,
  // craftedBy: null,
  // owner: null,
  // itemSlot: null,
  // attributes: [],

  // this is bullshit, should be one type...
  armorType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  accessoryType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  weaponType: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  damageType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  minDamage: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  maxDamage: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  armorValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default Item;
