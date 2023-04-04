'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, DataTypes) {
  
    await queryInterface.addColumn('carts',
       'totalprice',{
         type : DataTypes.FLOAT,
         defaultValue : 0
       }
    )
  },

  async down (queryInterface, DataTypes) {

    await queryInterface.removeColumn('carts', 'totalPrice');
  
  },
};