const productSchema= require('../schema/productSehema');


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
    const product =await productSchema.destroy({where :{
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
    
   showProducts : async () =>{
    const products = await productSchema.findAll();
    if(products){
        return true
      }
        else{
        return false;
    }
   },

   updateProducts : async (id,price) => {
    const data = {productPrice : price}
    const product = await productSchema.update(data, {where :{ productId : id}})

    if(product){ 
        return true }
    else{ 
        return false
    }
   },
 }
