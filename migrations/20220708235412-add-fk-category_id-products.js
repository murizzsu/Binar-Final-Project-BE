'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
        type: "FOREIGN KEY",
        name: 'FK_category_id_products',
        fields: ['category_id'],
        references: {
            table: 'categories',
            field: 'id'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'FK_category_id_products');
  }
};