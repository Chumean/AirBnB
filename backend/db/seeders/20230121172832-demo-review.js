'use strict';

// const { options } = require('../../routes');

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
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5,
      },
      { userId: 2,
        spotId: 2,
        review: "meh",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 3,
        review: "bad",
        stars: 1,
      }
    ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {})
  }
};
