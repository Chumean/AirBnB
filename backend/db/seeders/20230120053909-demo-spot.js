'use strict';


let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "1007 Mountain Drive",
        city: "Gotham",
        state: "New York",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Bat Cave",
        description: "Batman's secret hideout",
        price: 100000,
        // "createdAt": "2021-11-19 20:39:36",
        // "updatedAt": "2021-11-19 20:39:36",
        // "avgRating": 4.5,
        // "previewImage": "image url"
      },

      {
        ownerId: 2,
        address: "Outer Space",
        city: "Not applicable",
        state: "Not applicable",
        country: "Not applicable",
        lat: 38.7645358,
        lng: -122.4730327,
        name: "Death Star",
        description: "Definitely not a moon",
        price: 500000,
        // "createdAt": "2021-11-19 20:39:36",
        // "updatedAt": "2021-11-19 20:39:36",
        // "avgRating": 2.7,
        // "previewImage": "image url"
      },

      {
        ownerId: 3,
        address: "Yongen Jaya",
        city: "Setagaya",
        state: "Tokyo",
        country: "Japan",
        lat: 39.7645358,
        lng: -122.4730327,
        name: "Cafe LeBlanc",
        description: "Coffee and Curry",
        price: 333,
        // "createdAt": "2021-11-19 20:39:36",
        // "updatedAt": "2021-11-19 20:39:36",
        // "avgRating": 1.5,
        // "previewImage": "image url"
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
