require('dotenv').config();

const apiKey = process.env.RAZORPAY_API_KEY;

const secretKey =  process.env.RAZORPAY_SECRET_KEY;

console.log(apiKey);
console.log(secretKey);

const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id : apiKey,
  key_secret: secretKey,
});


module.exports =razorpay;




