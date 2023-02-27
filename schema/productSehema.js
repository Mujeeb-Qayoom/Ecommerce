const DataTypes = require('sequelize').DataTypes;
const { UUIDV4 } = require('sequelize');
const sequelize = require('../config/db');
const users = require('../schema/userSchema');
const productSchema = sequelize.define("product", {

     productId :{
        type : DataTypes.UUID,
        defaultValue : UUIDV4,
        primaryKey : true,
     },
     productName : {
        type : DataTypes.STRING,
        allowNull : false,
     },
     productDescription :{
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

})  

productSchema.belongsTo(users,{foreignKey : 'userId'});

sequelize.sync().then(()=>{
   console.log("product table has been created")
}).catch((err)=>{
    console.log("unable to create product table",err);
})

module.exports = productSchema;