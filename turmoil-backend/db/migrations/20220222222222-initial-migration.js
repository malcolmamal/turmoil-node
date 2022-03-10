module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('users', {
            "id": {
                "autoIncrement": true,
                "allowNull": false,
                "primaryKey": true,
                "field": "id",
                "type": DataTypes.INTEGER
            },
            "name": {
                "allowNull": false,
                "field": "name",
                "type": DataTypes.STRING
            },
            "password": {
                "allowNull": false,
                "field": "password",
                "type": DataTypes.STRING
            },
            "email": {
                "allowNull": false,
                "field": "email",
                "type": DataTypes.STRING
            },
            "createdAt": {
                "allowNull": false,
                "field": "createdAt",
                "type": DataTypes.DATE
            },
            "updatedAt": {
                "allowNull": false,
                "field": "updatedAt",
                "type": DataTypes.DATE
            }
        });

        await queryInterface.createTable('attributes', {
            "id": {
                "autoIncrement": true,
                "allowNull": false,
                "primaryKey": true,
                "field": "id",
                "type": DataTypes.INTEGER
            },
            "type": {
                "allowNull": false,
                "field": "type",
                "type": DataTypes.STRING
            },
            "primaryValue": {
                "allowNull": false,
                "defaultValue": 0,
                "field": "primaryValue",
                "type": DataTypes.FLOAT
            },
            "secondaryValue": {
                "allowNull": false,
                "defaultValue": 0,
                "field": "secondaryValue",
                "type": DataTypes.FLOAT
            },
            "tertiaryValue": {
                "allowNull": false,
                "defaultValue": 0,
                "field": "tertiaryValue",
                "type": DataTypes.FLOAT
            },
            "createdAt": {
                "allowNull": false,
                "field": "createdAt",
                "type": DataTypes.DATE
            },
            "updatedAt": {
                "allowNull": false,
                "field": "updatedAt",
                "type": DataTypes.DATE
            }
        });

        await queryInterface.createTable('items', {
            "id": {
                "autoIncrement": true,
                "allowNull": false,
                "primaryKey": true,
                "field": "id",
                "type": DataTypes.INTEGER
            },
            "itemCode": {
                "allowNull": false,
                "field": "itemCode",
                "type": DataTypes.STRING
            },
            "itemName": {
                "allowNull": true,
                "field": "itemName",
                "type": DataTypes.STRING
            },
            "level": {
                "allowNull": false,
                "defaultValue": 1,
                "field": "level",
                "type": DataTypes.INTEGER
            },
            "durability": {
                "allowNull": false,
                "defaultValue": 1,
                "field": "durability",
                "type": DataTypes.INTEGER
            },
            "priceValue": {
                "allowNull": false,
                "defaultValue": 0,
                "field": "priceValue",
                "type": DataTypes.INTEGER
            },
            "itemType": {
                "allowNull": false,
                "field": "itemType",
                "type": DataTypes.STRING
            },
            "rarity": {
                "allowNull": false,
                "field": "rarity",
                "type": DataTypes.STRING
            },
            "isCrafted": {
                "allowNull": false,
                "default": false,
                "field": "isCrafted",
                "type": DataTypes.BOOLEAN
            },
            "isEquipped": {
                "allowNull": false,
                "default": false,
                "field": "isEquipped",
                "type": DataTypes.BOOLEAN
            },
            "isStashed": {
                "allowNull": false,
                "default": false,
                "field": "isStashed",
                "type": DataTypes.BOOLEAN
            },
            "armorType": {
                "allowNull": true,
                "field": "armorType",
                "type": DataTypes.STRING
            },
            "accessoryType": {
                "allowNull": true,
                "field": "accessoryType",
                "type": DataTypes.STRING
            },
            "weaponType": {
                "allowNull": true,
                "field": "weaponType",
                "type": DataTypes.STRING
            },
            "damageType": {
                "allowNull": true,
                "field": "damageType",
                "type": DataTypes.STRING
            },
            "minDamage": {
                "allowNull": false,
                "defaultValue": 0,
                "field": "minDamage",
                "type": DataTypes.INTEGER
            },
            "maxDamage": {
                "allowNull": false,
                "defaultValue": 0,
                "field": "maxDamage",
                "type": DataTypes.INTEGER
            },
            "armorValue": {
                "allowNull": false,
                "defaultValue": 0,
                "field": "armorValue",
                "type": DataTypes.INTEGER
            },
            "createdAt": {
                "allowNull": false,
                "field": "createdAt",
                "type": DataTypes.DATE
            },
            "updatedAt": {
                "allowNull": false,
                "field": "updatedAt",
                "type": DataTypes.DATE
            }
        });

    },

    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('attributes');
        await queryInterface.dropTable('items');
    },
};