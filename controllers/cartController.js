const cartmodel = require('../models/cart');
const response = require('../helpers/responseHandler')

module.exports = {

    addToCart : async(req,res)=>{
        const data = {
            totalPrice: req.body.totalPrice,
            quantity:   req.body.quantity,
            status:     req.body.status,
            discount:   req.body.discount,
            userId:     req.user.userId,
            productId:  req.body.productId
        }
        const result = await cartmodel.add(data);

        if(result){
            return response.successResponse(req,res,200,"Added to cart");
        }

         else{
            return response.errorResponse(req,res,400,"unable to add");
         }
    },

    moveToSaveLater : async(req,res) =>{

        const result = await cartmodel.saveLater(req.body.productId)

        if(result){
            return response.successResponse(req,res,200,"moved to save later");
        }
         else{
            return response.errorResponse(req,res,400,"something went wrong");
         }
    },

    myCart : async(req,res) =>{

        const result = await cartmodel.myCart(req.user.userId);

        if(result){
            return response.successResponse(req,res,200,result);
        }
         else{
            return response.errorResponse(req,res,400,"something went wrong");
        }
    },
}