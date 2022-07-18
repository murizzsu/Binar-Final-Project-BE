'use strict';

const { replaceEnum } = require("../helpers/database/replaceEnum");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
        'products',
        'status',
        {
            type: Sequelize.TEXT,
            defaultValue: 'open_for_bid',
        }
    );
    
    if (queryInterface.sequelize.options.dialect == "sqlite") {
      return;
    }
    return replaceEnum({
        tableName: 'products',
        columnName: 'status',
        defaultValue: 'open_for_bid',
        newValues: ['open_for_bid', 'sold'],
        queryInterface
      });


    // await queryInterface.changeColumn(
    //     'products',
    //     'status',
    //     {
    //         type: Sequelize.ENUM('open_for_bid', 'sold'),
    //         defaultValue: 'open_for_bid',
    //     }
    // );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_products_status";');
  }
};