const productModel = require('../models/product');
const response = require('../helpers/responseHandler');

module.exports = {

    addProduct:  async (req,res) => {

        const data = {
        userId: req.user.userId,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productQuantity: req.body.productQuantity,
        status: req.body.status,
        catagory: req.body.catagory,
      }
      try {
        const result = await productModel.add(data);
  
         if (result) {
          return response.successResponse(req, res, 200, "product added")
          // return res.status(200).json({message : "product added sucessfully"})
        }
        return response.errorResponse(req, res, 400, error.message)
        // return res.status(400).json({error : "unable to add product"})
      }
  
      catch (err) {
        return response.serverResponse(res, 500, "server error")
        //return res.status(500).json({error : "server error"})
      }
  
    },
  
    deleteProduct: async (req, res) => {
  
      try {
        const result = await productModel.delete(req.body.productId);
        if(result) {
          return res.status(201).json({ message: "product deleted sucessfully" });
        }
        else {
          return res.status(404).json({ message: "product not found" });
        }
      }
      catch (error) {
        return res.status(500).json({ message: "server error" });
      }
  
    },
  
    myProducts : async (req, res) =>{
      try {
           const result = await productModel.products(req.user.userId);
           return response.successResponse(req,res,200,result)
      }
      catch(error){
        return response.serverResponse(res,500,'server error');
          
      }
    },

    searchProducts : async(req,res) => {
        //try{
            const products = await productModel.search(req.body.search)

            if(products){
                return response.successResponse(req,res,201,products);
            }

            else {
                return response.errorResponse(res,res,400,"no match found")
            }
        // }
        // catch(err){
        //     return response.serverResponse(res,500,"server error")
        // }
    }

}