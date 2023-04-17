const orderModel = require('../models/order.js');
const cartModel = require('../models/cart');
const response = require('../helpers/responseHandler');

module.exports = {

    proceedToBuy : async(req,res) =>{
        const cartValue = await cartModel.cartvalue(req.user.userId);
    
        const quantity = await cartModel.totalQuantity(req.user.userId);
        const products = await cartModel.myProducts(req.user.userId);

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
    },

    deleteOrder : async(req,res) =>{
           
        const order = await orderModel.delete(req);

        if(order){
            return response.successResponse(req,res,200,"order deleted sucessfully");
        }
            return response.errorResponse(req,res,400,"order not found")
    },

    getAllOrders : async(req,res) =>{

        const orders =await orderModel.getAll()
        
        if(orders){
            return response.successResponse(req,res,200,orders);
        }
            return response.errorResponse(req,res,400,"orders not found")
    },

    confirmOrder: async(req,res) =>{
        const confirm  = await orderModel.confirm(req);

        if(confirm){
            return response.successResponse(req,res,200,confirm);
        }
            return response.errorResponse(req,res,400,"not confirmed")
 },
} 