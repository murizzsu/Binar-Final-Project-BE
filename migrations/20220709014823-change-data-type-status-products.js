'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'products',
        'status',
        {
            type: Sequelize.ENUM('open_for_bid', 'waiting_for_bid', 'sold'),
            defaultValue: 'open_for_bid',
        }
    )
    await queryInterface.removeColumn('products', 'sold')
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'status')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_products_status";');
  }
};