'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('images', {
        type: "FOREIGN KEY",
        name: 'FK_product_id_images',
        fields: ['product_id'],
        references: {
            table: 'products',
            field: 'id'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('images', 'FK_product_id_images');
  }
};