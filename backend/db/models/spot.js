'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      Spot.hasMany(models.Review, {foreignKey: 'spotId'})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    longitude: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    avgRating: DataTypes.DECIMAL,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
