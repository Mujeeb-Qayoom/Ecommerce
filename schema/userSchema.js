const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../config/db');
const userSchema = sequelize.define("user", {

    userId :{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

    firstName: {
      type: DataTypes.STRING,
      allowNull :false,
      validate :{
        is : /^[a-zA-Z _.]+[^\W\s_0-9]$/
        }
      },  
    lastName: {
      type:DataTypes.STRING,
      allowNull :false,
      validate :{
        is : /^[a-zA-Z _.]+[^\W\s_0-9]$/
        }
     },  
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate : {
        isEmail : true
      }
     },
    phone: {
       type:DataTypes.STRING,
       unique :true,
       allowNull :false,
       max : 15,
    },
    country :{
        type : DataTypes.STRING,
        allowNull :false,
    },
    state :{
        type: DataTypes.STRING,
        allowNull :false
    },
    city :{
        type :DataTypes.STRING,
        allowNull :false
    },
     password: {
        type:DataTypes.STRING,
        allowNull : false,
        min : 8,
    },
    role: {
       type: DataTypes.STRING,
       allowNull:false
    },
     status: {
      type:DataTypes.STRING,
      allowNull :false
    },
    

    })

     sequelize.sync().then(() => {
        console.log('user table created successfully!');
     }).catch((error) => {
        console.error('Unable to create table ', error);
     });
    
    module.exports = userSchema;



