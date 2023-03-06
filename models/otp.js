const otpSchema = require('../schema/otpSchema');

module.exports = {

   emailverification : async(otp,userId,otpCreatedDate,expiresAt)=>{
      const data ={
         otpValue : otp,
         userId : userId ,
         otpCreatedDate: otpCreatedDate,
         otpExpiryDate : expiresAt
        }
      
      const result = await otpSchema.create(data)
      console.log(result);
      return result;
      },
   
   accountVerification : async(id,otp)=>{
      try {
      const data = await otpSchema.findOne({where :{ userId : id}})
      console.log(data);
      console.log(otp + " and " + data.otpValue)

      if(otp != data.otpValue && (data.otpExpiryDate < new Date()))
      { 
         return false
      }
       else{
         return true
      }
   }
     catch(error){
      return false
     }
   }
}
