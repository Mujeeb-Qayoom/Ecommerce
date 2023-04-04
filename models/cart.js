const cartSchema = require('../schema/cartSchema');

module.exports = {

    add : async(data) =>{
        const cart = await cartSchema.create(data);

        if(cart){
            return true;
        }
        else{
            return false;
        }
    },

    delete : async  (productId,userId) =>{
        const result = await cartSchema.destroy({where :{
                
            productId : productId,
            userId : userId,
        }});   
        
        if(result){
            return true;
        }
        else{
            return false;
        }
    },

    saveLater : async (id) => {
         const data = await cartSchema.update({status:"save for later"}, {where :{productId : id}});
         if(data){
            return true;
         }
         else {
            return false;
         }
    },

    myCart : async(UserId) =>{
        const data = await cartSchema.findAll({where:{UserId : UserId}});
        
        if(data){
            return data;
        }
        else {
            return false;
        }
    },

    check : async(Id) => {
        const data = await cartSchema.findOne({where :{productId :Id}});
        if(data){
            return data;
        }
        else {
            return false;
        }
    },
     
    update: async(price,id,userId,quantity) =>{
        const result = await cartSchema.update({totalPrice :price,quantity:quantity},{where:{productId : id,userId:userId}}) 
        if(result){
            return result;
        }
        else {
            return false
        }
    },

    cartvalue : async(id) =>{
        const value = await cartSchema.sum('totalprice',{where :{userId : id}});
        return value;
    },

    totalQuantity : async(id) =>{
        const quantity = await cartSchema.sum('quantity',{where :{userId : id}})
        return quantity;
    },

    myProducts: async(id) =>{
        const products = await cartSchema.findAll({
            attributes: ['productId'],
            where : {
                userId: id
              }
            })
        return products
    },
}
