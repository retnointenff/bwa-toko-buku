'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = bcrypt.hashSync("rahasia", 10);
     await queryInterface.bulkInsert('Users', [{
       name     : 'John Doe',
       email    : 'admin@yopmail.com',
       password : password,
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
