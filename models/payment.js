const paymentSchema = require('../schema/paymentSchema');

module.exports = {

    payment : async(req,id,amount,currency) =>{

      const data =   await paymentSchema.create({
            payment_id: id,
            amount,
            currency,
            status: 'created',
            userId : req.user.userId
          });
      if(data) {
        return data
      }   
        return false;

    }
}