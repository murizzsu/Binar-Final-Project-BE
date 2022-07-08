'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Bids, {
        as: 'bids',
        foreignKey: 'user_id' 
      })
      Users.belongsTo(models.Images, {
        as: 'image',
        foreignKey: 'image_id',
      })
    }
  }
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    underscored: true,
  });
  return Users;
};