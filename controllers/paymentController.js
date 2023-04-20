const paymentModel = require('../models/payment');
const razorpay = require('../helpers/paymentGateway.js');
const responses = require('../helpers/responseHandler.js');

module.exports = {

    payment : async(req,res) =>{

    const { amount, currency } = req.body;
     const options = {
     amount: amount * 100,
     currency,
   };

  try {
    const response = await razorpay.orders.create(options);
    const {id,amount} = response;

    const result = await paymentModel.payment(req,id,amount,currency);

     if(result){

    return responses.successResponse(req,res,200,response.id);
   }
    return responses.errorResponse(req,res,400,"unable to create payment Id")
  } 
  catch (error) {

    return responses.serverResponse(res,500,'An error occurred while creating the Razorpay order');
  }
}
}

    