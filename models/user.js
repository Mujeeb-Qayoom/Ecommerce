
const userSchema = require('../schema/userSchema');
const bcrypt = require('bcrypt');


module.exports = {

  signup : async(data) =>{
    try{
      const result = await userSchema.create(data);
      console.log(result.userId);
      if(result.userId){
        return true;
<<<<<<< HEAD
        }

      else {
          return false;
       } 
=======
      }
      else{
        return false
      } 
>>>>>>> parent of 300f926 (added cart schema)
    }
    catch(err){
      return err
      }
  }

  userLogin : async(req) =>{
        
      const user = await userSchema.findOne({where:{email : req.body.email}});
        if(!user){
          return false;
        }
      const dcrypt = await bcrypt.compare(req.body.password,user.password);
      
        if(!dcrypt)
        {
          return false;
        }
          return user;
  },

}


