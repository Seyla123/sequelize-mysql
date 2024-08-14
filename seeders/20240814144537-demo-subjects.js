'use strict';
/** @type {import('sequelize').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subjects', [
      {
        name: 'Mathematics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'English',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Science',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subjects', null, {});
  }
};
