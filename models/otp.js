const otpSchema = require('../schema/otpSchema');

module.exports = {

   emailverification : async(otp,userId,otpCreatedDate,expiresAt)=>{
      const data ={
         otpValue : otp,
         userId : userId,
         otpCreatedDate: otpCreatedDate,
         otpExpiryDate : expiresAt
        }
      const otpEntry = await otpSchema.findOne({where : {userId : userId}});

      if(!otpEntry){
      const result = await otpSchema.create(data);
      return result;
      }  
      else{
        const newOtp = await otpSchema.update({otpValue : otp}, {where :{userId : userId}});
        return newOtp;
      }  
   },
   
   accountVerification : async(id,otp)=>{ 
      try {
      const data = await otpSchema.findOne({where :{ userId : id}});
      //onsole.log(otp + " and " + data.otpValue);
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
