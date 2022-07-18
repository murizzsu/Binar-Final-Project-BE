'use strict';

const { replaceEnum } = require('../helpers/database/replaceEnum');

module.exports = {
  async up(queryInterface, Sequelize) {
    if (queryInterface.sequelize.options.dialect == "sqlite") {
      return;
    }
    return replaceEnum({
      tableName: 'bids',
      columnName: 'status',
      defaultValue: 'pending',
      newValues: ['pending', 'accepted', 'rejected'],
      queryInterface
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'bids',
      'status',
    );
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bids_status";');
  }
};