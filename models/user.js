
const userSchema = require('../schema/userSchema');
const bcrypt = require('bcrypt');


module.exports = {

  signup : async(data) =>{
    try{
      const result = await userSchema.create(data);
      if(result.userId){
        return result;
        }
      else {
          return false;
       } 
    }
    catch(err){
      return err
      }
  },

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

  getUsers :async(role) =>{
    const data = await userSchema.findAll({where :{role : role}});

    if(data) {
      return data;
    }
      return false;
  },

  deleteUser : async(userId) =>{

    const user = await userSchema.destroy({where :{userId}});
    
    if(user) {
      return true;
    }
      return false;

  }

}


