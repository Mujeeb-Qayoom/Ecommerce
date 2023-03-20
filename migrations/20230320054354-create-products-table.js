'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface , DataTypes) {
    
      await queryInterface.createTable('products', { 
            
        productId :{
          type : DataTypes.UUID,
          defaultValue : DataTypes.UUIDV4,
          primaryKey : true,
       },
       productName : {
          type : DataTypes.STRING,
          allowNull : false,
       },
       productDescription : {
          type: DataTypes.STRING,
       },
       productPrice : {
          type: DataTypes.FLOAT,
          allowNull : false
       },
       productQuantity : {
          type :DataTypes.INTEGER
       },
       catagory :{
          type : DataTypes.STRING
       },
       status :{
          type : DataTypes.BOOLEAN,
          defaultValue :true,},
       
      });
    
  },

  async down (queryInterface, DataTypes) {
    
      await queryInterface.dropTable('products');

  }
};
