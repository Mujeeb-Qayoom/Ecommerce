const cartmodel = require('../models/cart');
const productModel = require('../models/product');
const response = require('../helpers/responseHandler');

module.exports = {

    addToCart : async(req,res) =>{
        const productPrice = await productModel.getPrice(req.body.productId);
        totalPrice = productPrice *req.body.quantity;
        const data = {
            totalPrice: totalPrice,
            quantity:   req.body.quantity,
            status:     req.body.status,
            discount:   req.body.discount,
            userId:     req.user.userId,
            productId:  req.body.productId,
        }
        
        const product = await cartmodel.check(req.body.productId);
         if(!product){ 
            const result = await cartmodel.add(data);
         
           if(result){
            return response.successResponse(req,res,200,"Added to cart");
            }
            else{
            return response.errorResponse(req,res,400,"unable to add");
         }
        }
        else{
            console.log(req.body.productId);
            const data = await cartmodel.update(totalPrice,req.body.productId,req.user.userId,req.body.quantity);
        
            if(data){
                return response.successResponse(req,res,200,"Added to cart");
            }
            else{
            return response.errorResponse(req,res,400,"unable to add");
            }
       }
    
    },

    deleteFromCart : async(req,res) =>{

        const result = await cartmodel.delete(req.body.productId,req.user.userId);

        if(result){
            return response.successResponse(req,res,200,"deleted from cart");
        }

        else{
            return response.errorResponse(req,res,400,"unable to delete");
        }
    },

    moveToSaveLater : async(req,res) =>{

        const result = await cartmodel.saveLater(req.body.productId);

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

    proceedToBuy : async(req,res)=>{

        const data = await cartmodel.proceedToBuy(req.user.userId,req);

        if(data) {
            return response.successResponse(req,res,200,data);
        }
        else {
            return response.errorResponse(req,res,400,"something went wrong");
        }
    },
}