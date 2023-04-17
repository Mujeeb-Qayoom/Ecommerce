const jwt = require('jsonwebtoken');
const response = require('../helpers/responseHandler');
const userSchema = require('../schema/userSchema');


module.exports = {

 generateToken : async (userId) => {
     const newtoken = jwt.sign({user_id :userId.toString()},process.env.JWT_SECRET_KEY,{ expiresIn : '5m'});
    return newtoken;
    },

 userAuth : async (req,res,next)=>{

 // try {
    const token = req.header('Authorization').replace("Bearer ", "");
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

    if (!token) {
      return response.errorResponse(req,res,401,'Missing authorization header');
    }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {
       if (err) {
        return false;
       }
       return decoded;
     }) 
       if(!decoded){
        return response.errorResponse(req,res,401,'session expired');
      }

   const user = await userSchema.findOne({where: {
      userId : decode.user_id}});
     
    if(!user){
     return  response.errorResponse(req,res,401,"please authenticate");
    } 
      req.user = user;
      req.token = token;
  //  }    
  //    catch(error){  
  //        return response.serverResponse(res,500,"Server Error");
  //       }
          next();
  },

  sellerAuth : async(req,res,next) =>{

    try {
      const token = req.header('Authorization').replace("Bearer ", "");

      if (!token) {
        return response.errorResponse(req,res,401,'Missing authorization header');
      }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {
         if (err) {
          return false;
         }
         return decoded
       }) 
         if(!decoded){
          return response.errorResponse(req,res,401,'session expired');
        }

      const user = await userSchema.findOne({where: 
        {userId : decoded.user_id,
         role : 'seller'}});
      if(!user){
       return response.errorResponse(req,res,401,"access denied");
      } 
        req.user = user;
        req.token = token;
     }    
       catch(error){  
           return response.serverResponse(res,500,"server errorrr");
     }
            next();
    },
    
    adminAuth : async(req,res,next) =>{

     try {
        const token = req.header('Authorization').replace("Bearer ", "");
      
        if (!token) {
          return response.errorResponse(req,res,401,'Missing authorization header');
        }
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {
           if (err) {
            return false;
           }
           return decoded
         }) 
           if(!decoded){
            return response.errorResponse(req,res,401,'session expired');
          }

      const user = await userSchema.findOne({where: 
          {userId : decoded.user_id,
          role : 'admin'}});
        if(!user){
         return res.status(401).json({message: "access denied"});
        } 
          req.user = user;
          req.token = token;
       }    
         catch(error){  
             return  res.status(500).json({message: "server error"});
            }
          next();
  
    },
  }