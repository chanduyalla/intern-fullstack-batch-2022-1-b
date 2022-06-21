'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Orders}) {
      // define association here
      Driver.belongsTo(Users,{foreignKey:'driver_id'})
      Driver.belongsTo(Orders,{foreignKey:'oid'})
    }
  }
  Driver.init({
    driver_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    oid: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    flag:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'drivers',
    modelName: 'Driver',
  });
  return Driver;
};