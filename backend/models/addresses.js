'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      Addresses.belongsTo(Users,{foreignKey:'user_id'})
    }
  }
  Addresses.init({
    address: {
      allowNull:false,
      type:DataTypes.STRING
    },
    pincode:{
      allowNull:false,
      type:DataTypes.INTEGER
    },
    user_id: {
      allowNull:false,
      type:DataTypes.INTEGER
    },
    cart_id:{
      allowNull:false,
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName:'addresses',
    modelName: 'Addresses',
  });
  return Addresses;
};