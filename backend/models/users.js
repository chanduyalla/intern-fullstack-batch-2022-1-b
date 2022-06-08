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
    static associate({Roles,Addresses,Cart,Orders,DriverSelctdOrd}) {
      // define association here
      Users.belongsTo(Roles,{foreignKey:'role_id'})
      Users.hasMany(Addresses,{foreignKey:'user_id'})
      Users.hasMany(Cart,{foreignKey:'user_id'})
      Users.hasMany(Orders,{foreignKey:'user_id'})
      Users.hasMany(DriverSelctdOrd,{foreignKey:'driver_id'})
    }
  }
  Users.init({
    name: {
      allowNull:false,
      type:DataTypes.STRING
    },
    email:  {
      allowNull:false,
      type:DataTypes.STRING
    },
    password:  {
      allowNull:false,
      type:DataTypes.TEXT
    },
    phone_number:  {
      allowNull:false,
      type:DataTypes.STRING
    },
    role_id:  {
      allowNull:false,
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName:'users',
    modelName: 'Users',
  });
  return Users;
};