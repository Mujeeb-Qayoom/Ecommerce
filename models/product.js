const productSchema= require('../schema/productSehema');
const {Op} = require('sequelize');

module.exports = {

   add : async(data) =>{
    const product = await productSchema.create(data);

    if(product){
        return true
    }
    else{ 
        return false
    }
  },

   delete : async(id)=>{
    const product = await productSchema.destroy({where :{
        productId : id
    }})
    console.log(product);

    if(product){
        return true;
    }
    else{
        return false;
    } 
   },
    
   products : async (userId) => {
    const products = await productSchema.findAll({where:{userId:userId}});
    if(products){
        return products;
      }
        else{
        return false;
    }
   },

   getProduct : async(req) =>{

    const product = await productSchema.findOne({where :{ productId : req.body.productId, userId : req.user.userId}});

    if(product) {
        return product;
    }
        return false;
   },
   search : async (key) =>{
 
        const data = await productSchema.findAll({
           where : {
             [Op.and] : [   
                {catagory : key},
                { productPrice : { [Op.lt] : 100000}}
            ]
           }   
             })    
        if (data.length){
            return data;
        }
        else {
            return false;
        }
   },

   getPrice : async(Id) =>{
     
     const product = await productSchema.findOne({where : {productId : Id}});

     return product.productPrice;
    },

   getAll : async() =>{
     
        const data = await productSchema.findAll();
        
        if(data) {
            return data;
        }
             return false;

   }
 }
