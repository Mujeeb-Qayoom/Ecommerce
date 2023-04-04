const DataTypes = require('sequelize').DataTypes;
const { UUIDV4 } = require('sequelize');
const sequelize = require('../config/db');
const users = require('./userSchema');
const cart = require('./cartSchema');

const orderSchema = sequelize.define("order", {

      orderId: {
        type: DataTypes.UUID,
        defaultValue : UUIDV4,
        primaryKey: true,
      },
      status: {
        type : DataTypes.STRING,
        allowNull : false,
      },
      totalAmount : {
        type : DataTypes.FLOAT,
        allowNull : false
      },
      totalQuantity :{
        type : DataTypes.INTEGER,
        allowNull : false
      },
      products : {
        type: DataTypes.JSON,
      },
      shippingAddress :{
        type : DataTypes.STRING,
        allowNull :false
      },
      billingAddress :{
        type :DataTypes.STRING,
        allowNull : false
      },
      paymentMethod : {
        type : DataTypes.STRING,
        allowNull : false
      },
      dilveryCharges :{
        type : DataTypes.INTEGER,
        defaultValue : 0
      },
      isDelivered :{
         type : DataTypes.BOOLEAN,
         defaultValue : false
      }
  })
    orderSchema.belongsTo(users,{ foreignKey : "userId"});

    sequelize.sync().then(()=>{
         console.log("product table has been created")
     }).catch((err)=>{
         console.log("unable to create product table",err);
     })

    module.exports = orderSchema;
