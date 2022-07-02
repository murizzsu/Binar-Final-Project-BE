'use strict';
const encryptPass = require("../controllers/encrypt-decrypt/encrypt_pass");
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
     await queryInterface.bulkInsert("users", [
      {
        email: "rizky@gmail.com",
        password: await encryptPass("12345"),
        img_url: "photo.png",
        name: "Rizky",
        city: "Jakarta",
        address: "Jakarta",
        phone: "082224442331",
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
     await queryInterface.bulkDelete('users', null, {});
  }
};
