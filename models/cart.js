const cartSchema = require('../schema/cartSchema')

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
    }
