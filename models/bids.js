'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bids extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bids.belongsTo(models.Users, {
        as: 'user',
        foreignKey: 'user_id',
      });

      Bids.belongsTo(models.Products, {
        as: 'product',
        foreignKey: 'product_id',
      });

      Bids.hasOne(models.Notifications,{
        as: "notification",
        foreignKey: 'bid_id',
      });
    }
  }
  Bids.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    request_price: DataTypes.FLOAT,
    status: DataTypes.ENUM('pending', 'accepted', 'rejected')
  }, {
    sequelize,
    modelName: 'Bids',
    underscored: true,
  });
  return Bids;
};