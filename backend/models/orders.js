'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Users,Products,Driver,CartItems}) {
      // define association here
      Orders.belongsTo(Users,{foreignKey:'user_id'});
      Orders.belongsTo(Products,{foreignKey:'product_id'})
      Orders.hasOne(Driver,{foreignKey:'oid'})
    }
  }
  Orders.init({
    oid:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    product_id:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    ordered_date: {
      type:DataTypes.DATE,
      allowNull:false
    },
    order_status: {
      type:DataTypes.STRING,
      allowNull:false
    },
    total_price: {
      allowNull:false,
      type:DataTypes.DOUBLE
    }
  }, {
    sequelize,
    tableName:'orders',
    modelName: 'Orders',
  });
  return Orders;
};