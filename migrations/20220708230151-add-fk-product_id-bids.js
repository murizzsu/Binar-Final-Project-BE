'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('bids', {
        type: "FOREIGN KEY",
        name: 'FK_product_id_bids',
        fields: ['product_id'],
        references: {
            table: 'products',
            field: 'id'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('bids', 'FK_product_id_bids');
  }
};