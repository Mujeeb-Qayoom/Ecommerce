const orderModel = require('../models/order');
const cartModel = require('../models/cart');



module.exports = {

    placeOrder : async(req,res) => {

       const data = await orderModel.order(req.user.userId);


    },

   

}