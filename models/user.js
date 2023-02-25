
const userSchema = require('../schema/userSchema');


module.exports = {

  signup : async(data) =>{
    try{
      const result = await userSchema.create(data);
      console.log(result.userId);
      if(result.userId){
        return true;
      }
      else{
        return false
      } 
    }
    catch(err){
      return err
      }
  }

}


