'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      product_price: {
        allowNull:false,
        type: Sequelize.DOUBLE
      },
      quantity: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      product_status: {
        allowNull:false,
        type: Sequelize.STRING
      },
      product_image: {
        allowNull:false,
        type: Sequelize.STRING
      },
      category_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      delete_status: {
        allowNull:false,
        type: Sequelize.STRING
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};