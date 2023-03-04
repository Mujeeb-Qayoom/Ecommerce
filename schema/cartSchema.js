const DataTypes = require('sequelize').DataTypes;
const { UUIDV4 } = require('sequelize');
const sequelize = require('../config/db');
const users = require('../schema/userSchema');
const products = require('../schema/productSehema')

const cartSchema = sequelize.define("cart", {

   cartId: {
        type: DataTypes.UUID,
        defaultValue : UUIDV4,
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
})    
cartSchema.belongsTo(users,{foreignKey : 'userId'});
cartSchema.belongsTo(products,{foreignKey : 'productId'});

sequelize.sync().then(()=>{
    console.log("cart table has been created")
 }).catch((err)=>{
     console.log("unable to create cart table",err);
 })

module.exports = cartSchema;