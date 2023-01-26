'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {

    static async createImage({url, reviewImageId, preview}) {
      const newReviewImage = await ReviewImage.create({
        url, reviewImageId, preview
      });

      return await ReviewImage.findByPk(newReviewImage.reviewImageId)
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(models.Review, {foreignKey: 'reviewId'})
    }
  }
  ReviewImage.init({
    url: DataTypes.STRING,
    reviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
