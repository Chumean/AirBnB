'use strict';

const { options } = require('../../routes');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema === process.env.SCHEMA; // define schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        "review": "This was an awesome spot!",
        "stars": 5,
      },
      {
        "review": "meh",
        "stars": 3,
      },
      {
        "review": "bad",
        "stars": 1,
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
