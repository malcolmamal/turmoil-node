// eslint-disable-next-line import/no-extraneous-dependencies
import migrate from 'sequelize-automated-migrations';
import fs from 'fs';
import path from 'path';
import beautify from 'js-beautify';
import db from '../models/index.js';

const migrationsDir = './db/migrations/';

// current state
const currentState = {
  tables: {},
};

// load last state
const previousState = {
  revision: 0,
  version: 1,
  tables: {},
};

const { sequelize } = db;

if (!sequelize.models) {
  sequelize.models = { ...sequelize };
  delete sequelize.models.sequelize;
  delete sequelize.models.Sequelize;
}
const { models } = sequelize;

currentState.tables = migrate.reverseModels(sequelize, models);
const actions = migrate.parseDifference(previousState.tables, currentState.tables);
// sort actions
migrate.sortActions(actions);
const migration = migrate.getMigration(actions);
if (migration.commandsUp.length === 0) {
  // eslint-disable-next-line no-console
  console.log('No changes found');
  process.exit(0);
}

// save current state
currentState.revision = previousState.revision + 1;

const upValues = Object.values(currentState.tables).map((el) => `    await queryInterface.createTable('${el.tableName}', 
      ${JSON.stringify(el.schema, null, 2)}
    );\n`);

const downValues = Object.values(currentState.tables).map((el) => `    await queryInterface.dropTable('${el.tableName}');`);

const template = `module.exports = {
  async up(queryInterface, DataTypes) {
${upValues.join('\n').replaceAll('seqType', 'type')
    .replaceAll('"Sequelize', 'DataTypes')
    .replaceAll('"\n  }', '\n  }')
    .replaceAll('"defaultValue": {\n      "value": 1\n    }', '"defaultValue": 1')
    .replaceAll('"defaultValue": {\n      "value": 0\n    }', '"defaultValue": 0')
    .replaceAll('"defaultValue": {\n      "value": false\n    }', '"default": false')
    .replaceAll('"defaultValue": {\n      "value": true\n    }', '"default": true')}      
  },

  async down(queryInterface, DataTypes) {
${downValues.join('\n')}
  },
};
`;

const output = beautify(template, null, 2, 100);

fs.writeFileSync(path.join(migrationsDir, '20220222222222-initial-migration.js'), output);
