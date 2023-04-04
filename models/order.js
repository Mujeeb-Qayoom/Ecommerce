const orderSchema = require('../schema/orderSchema.js');

module.exports = {

    orderNow : async(data) =>{
            
        const result = await orderSchema.create(data);

        if(result){
            return true;
        }
        else{
            return false;
        }

    }
}