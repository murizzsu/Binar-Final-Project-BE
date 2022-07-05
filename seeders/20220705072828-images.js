'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  await queryInterface.bulkDelete("images", {product_id:1}, {});
     await queryInterface.bulkInsert("images", [
      {
        name: "Images_product_1-1",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Images_product_1-2",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Images_product_1-3",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Images_product_1-4",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
