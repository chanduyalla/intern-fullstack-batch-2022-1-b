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
     static associate({Categories,CartItems,Orders}) {
      // define association here
      Products.belongsTo(Categories,{foreignKey:'category_id'})
      Products.hasMany(CartItems,{foreignKey:'product_id'})
      Products.hasMany(Orders,{foreignKey:'product_id'})
    }
  }
  Products.init({
    product_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    product_price: {
      type:DataTypes.DOUBLE,
      allowNull:false
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    product_status:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    product_image: {
      type:DataTypes.STRING,
      allowNull:false
    },
    category_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    delete_status:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    deleted_at:{
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    tableName:'products',
    modelName: 'Products',
  });
  return Products;
};