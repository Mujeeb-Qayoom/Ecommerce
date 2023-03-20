'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    
  await queryInterface.createTable('carts', {
        
    cartId: {
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      primaryKey: true,
    },
     totalPrice :{
      type: DataTypes.FLOAT,
      defaultValue : 0
     },
  
     quantity :{
     type : DataTypes.INTEGER,
     },
  
     status : {
      type : DataTypes.STRING,
      allowNull : false
     },
  
     discount:{
      type:DataTypes.FLOAT,
      defaultValue : 0
     }
      });
     
  },

  async down (queryInterface,DataTypes) {
  
      await queryInterface.dropTable('carts');
     
  }
};
