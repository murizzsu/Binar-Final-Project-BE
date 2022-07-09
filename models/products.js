'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.hasMany(models.Bids, {
        as: 'bids',
        foreignKey: 'product_id' 
      });

      Products.belongsTo(models.Categories, {
        as: 'category',
        foreignKey: 'category_id' 
      });

      Products.hasMany(models.Images, {
        as: "images",
        foreignKey: "product_id"
      })
    }
  }
  Products.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    // sold: DataTypes.BOOLEAN,
    status: DataTypes.ENUM('open_for_bid', 'waiting_for_bid', 'sold'),
  }, {
    sequelize,
    modelName: 'Products',
    underscored: true,
  });
  return Products;
};