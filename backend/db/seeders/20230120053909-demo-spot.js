'use strict';

const { Spot } = require('../models')

// const spots = [
//   {
//     "ownerId": 1,
//     "address": "123 Disney Lane",
//     "city": "San Francisco",
//     "state": "California",
//     "country": "United States of America",
//     "lat": 37.7645358,
//     "lng": -122.4730327,
//     "name": "App Academy",
//     "description": "Place where web developers are created",
//     "price": 123,
//     // "createdAt": "2021-11-19 20:39:36",
//     // "updatedAt": "2021-11-19 20:39:36",
//     "avgRating": 4.5,
//     "previewImage": "image url"
//   },

//   {
//     "ownerId": 2,
//     "address": "123 Disney Lane2",
//     "city": "San Francisco",
//     "state": "California",
//     "country": "United States of America",
//     "lat": 38.7645358,
//     "lng": -122.4730327,
//     "name": "App Academy2",
//     "description": "Place where web developers are created",
//     "price": 222,
//     // "createdAt": "2021-11-19 20:39:36",
//     // "updatedAt": "2021-11-19 20:39:36",
//     "avgRating": 4.5,
//     "previewImage": "image url"
//   },

//   {
//     "ownerId": 3,
//     "address": "123 Disney Lane3",
//     "city": "San Francisco",
//     "state": "California",
//     "country": "United States of America",
//     "lat": 39.7645358,
//     "lng": -122.4730327,
//     "name": "App Academy3",
//     "description": "Place where web developers are created",
//     "price": 333,
//     // "createdAt": "2021-11-19 20:39:36",
//     // "updatedAt": "2021-11-19 20:39:36",
//     "avgRating": 4.5,
//     "previewImage": "image url"
//   }
// ]

/** @type {import('sequelize-cli').Migration} */
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
