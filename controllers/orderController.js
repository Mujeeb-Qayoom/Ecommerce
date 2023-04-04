const orderModel = require('../models/order.js');
const cartModel = require('../models/cart');
const response = require('../helpers/responseHandler');

module.exports = {

    proceedToBuy : async(req,res) =>{
        const cartValue = await cartModel.cartvalue(req.user.userId);
    
        const quantity = await cartModel.totalQuantity(req.user.userId);
        const products = await cartModel.myProducts(req.user.userId);
        console.log("list of products", products);
        

        console.log(`cart value is ${cartValue} and totalQuantity is ${quantity}`);
        const data = {
           
            shippingAddress : req.body.shippingAddress,
            billingAddress : req.body.billingAddress,
            status : req.body.status,
            dilveryCharges : req.body.dilveryCharges,
            paymentMethod : req.body.paymentMethod,
            totalAmount : cartValue,
            totalQuantity : quantity,
            userId : req.user.userId,
            products :products
       }

       const order = await orderModel.orderNow(data);

       if(order){
        return response.successResponse(req,res,201,"sucessfull");
       }

       else{
        return response.errorResponse(req,res,400,"something went wrong");
       }
    }
}