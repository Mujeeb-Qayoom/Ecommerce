require('dotenv').config();

const apiKey = process.env.RAZORPAY_PUBLIC_KEY;

const secretKey =  process.env.RAZORPAY_SECRET_KEY;

const Razorpay = require('razorpay');


var instance = new Razorpay({
    key_id: apiKey,
    key_secret: secretKey,
  });




