'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
   await queryInterface.removeColumn('carts', 'discount');
  
  },

  async down (queryInterface, DataTypes) {
  
     await queryInterface.addColumn('carts',
        'discount',{
          type : DataTypes.FLOAT,
          defaultValue : 0
        }
     );
    
  }
};