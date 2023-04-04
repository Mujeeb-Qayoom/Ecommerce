'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn('products', 'images', {
      type: DataTypes.JSON,
      allowNull : false,
      defaultValue: []
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('products', 'images');
  }
};
