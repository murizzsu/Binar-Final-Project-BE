'use strict';

const { replaceEnum } = require("../helpers/database/replaceEnum");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
        'bids',
        'status',
        {
            type: Sequelize.TEXT,
            defaultValue: 'pending',
        }
    );
    
    return replaceEnum({
        tableName: 'bids',
        columnName: 'status',
        defaultValue: 'pending',
        newValues: ['pending', 'waiting_for_negotiation', 'rejected', 'accepted'],
        queryInterface
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bids_status";');
  }
};