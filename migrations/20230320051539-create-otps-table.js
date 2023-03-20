'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    
     await queryInterface.createTable('otps', {
      otpId: {
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey: true,
      },

       otpValue:{
       type :DataTypes.INTEGER
      },

       otpCreatedDate :{
       type : DataTypes.DATE
      },

       otpExpiryDate :{
        type : DataTypes.DATE
      }       
     });
  },

  async down (queryInterface, DataTypes) {
    
      await queryInterface.dropTable('otps');
  }
};
