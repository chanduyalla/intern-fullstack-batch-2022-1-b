'use strict';
const bcrypt=require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    const password=bcrypt.hashSync("chandu",10);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('users', [{
        id:1,
        user_name:'chandrika',
        email:'chandrikayalla.516@gmail.com',
        password:password,
        phone_number:'7799196683',
        role_id:1,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
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
