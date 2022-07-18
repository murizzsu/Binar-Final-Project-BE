'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
        type: "FOREIGN KEY",
        name: 'FK_user_id_products',
        fields: ['user_id'],
        references: {
            table: 'users',
            field: 'id'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'FK_user_id_products');
  }
};