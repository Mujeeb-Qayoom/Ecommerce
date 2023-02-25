const otpSchema = require('../schema/otpSchema');

module.exports = {

   emailverification : async(otp,userId,otpCreatedDate,expiresAt)=>{
      const data ={
         otpValue : otp,
         userUserId : userId ,
         otpCreatedDate: otpCreatedDate,
         otpExpiryDate : expiresAt
        }
      
      const result = await otpSchema.create(data)
      console.log(result);
      return result;
      },
   
   accountVerification : async(id,otp)=>{
      try {
      const data = await otpSchema.findOne({where :{ userUserId : id}})

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
