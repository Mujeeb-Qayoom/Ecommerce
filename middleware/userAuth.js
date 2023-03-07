const jwt = require('jsonwebtoken');
const userSchema = require('../schema/userSchema');

  
   module.exports = {

   generateToken : async (userId) => {

    console.log(userId);

    const newtoken = jwt.sign({user_id :userId.toString()},process.env.SECRET_KEY,{ expiresIn : '1h'});
    return newtoken;
    },

    userAuth : async (req,res,next)=>{

     try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        const user = await userSchema.findOne({where: {userId : decode.user_id}});

        console.log("user auth",decode.user_id);
        
        if(!user){
           return res.status(401).json({message: "please authenticate"});
        } 
         req.user = user;
         req.token = token;
     }    
     catch(error){  
         return  res.status(401).json({message: "please authenticate"});
        }
          next();
       }

   }