const DataTypes = require('sequelize').DataTypes;
const { UUIDV4 } = require('sequelize');
const sequelize = require('../config/db');
const users = require('../schema/userSchema');

const otpSchema = sequelize.define("otp", {

    otpId: {
        type: DataTypes.UUID,
        defaultValue : UUIDV4,
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
otpSchema.belongsTo(users);


sequelize.sync().then(() => {
    console.log('otp table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table ', error);
 });

module.exports = otpSchema;