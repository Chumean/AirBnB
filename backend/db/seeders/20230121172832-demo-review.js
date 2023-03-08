'use strict';

// const { options } = require('../../routes');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: "Pretty dank and quiet. Comes with butler though!",
        stars: 5,
      },
      { userId: 2,
        spotId: 2,
        review: "Feels like you're in a prison. This wookie won't leave me alone though",
        stars: 2,
      },
      {
        userId: 3,
        spotId: 3,
        review: "Great coffee and curry combo. Cat keeps telling me to go to sleep though",
        stars: 4,
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {})
  }
};
