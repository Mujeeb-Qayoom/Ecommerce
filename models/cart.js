const cartSchema = require('../schema/cartSchema')

module.exports = {

    add : async(data) =>{
        console.log(data);
        const cart = await cartSchema.create(data);

        if(cart){
            return true;
        }
        else{
            return false;
        }
    },

    findUser : async (id) =>{
         const result = await cartSchema.findOne({where :{userId : id}})
         if(result){
            return true;
         }
         else {
            return false;
         }
    },
}