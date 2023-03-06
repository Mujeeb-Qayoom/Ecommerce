const jwt = require('jsonwebtoken');
const userSchema = require('../schema/userSchema');

  
   module.exports = {

   generateToken : async (userId) => {

    console.log(userId);

    const newtoken = jwt.sign({user_id :userId.toString()},process.env.SECRET_KEY,{ expiresIn : '1h'});
    return newtoken;
    },

    userAuth : async (req,res,next)=>{
        console.log("in the authentication middleware");
        try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        const user = await userSchema.findOne({userId : decode.userId});
        
        if(!user){
 
           return res.status(401).json({message: "please authenticate"})
          
        } 
       req.token = token;
    
       req.user =user;
     }    
        catch(error){  
         return  res.status(401).json({message: "please authenticate"})
        }
          next();
       }

   }