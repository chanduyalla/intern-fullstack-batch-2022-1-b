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
     static associate({Roles,Addresses,CartItems,Orders,Driver}) {
      // define association here
      Users.belongsTo(Roles,{foreignKey:'role_id'})
      Users.hasMany(Addresses,{foreignKey:'user_id'})
      Users.hasMany(CartItems,{foreignKey:'user_id'})
      Users.hasMany(Orders,{foreignKey:'user_id'})
      Users.hasMany(Driver,{foreignKey:'driver_id'})
    }
  }
  Users.init({
    user_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    phone_number: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    role_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'users',
    modelName: 'Users',
  });
  return Users;
};