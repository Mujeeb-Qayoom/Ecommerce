const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const user = require('./userSchema');

const PaymentSchema = sequelize.define('payment', {
  payment_id: {
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

PaymentSchema.belongsTo(user,{foreignKey : 'userId'});

module.exports = PaymentSchema;
