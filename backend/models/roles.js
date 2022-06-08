'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      Roles.hasMany(Users,{foreignKey:'role_id'})
    }
  }
  Roles.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'roles',
    modelName: 'Roles',
  });
  return Roles;
};