const bcrypt = require('bcrypt');
const User = require('../models/user');
const Otp = require('../models/otp');
const mailer = require('../helpers/mailer')
const randomNumber = require('../helpers/randamNo');


module.exports ={

    signup :  async(req,res) => {

        const checkemail = await User.findOne({where :{email:req.body.email}})
        console.log(checkemail);
        if(checkemail){
            return res.status(409).json({error: "email already exists"})
        }
       
        if(req.body.password !== req.body.confirmPassword)
          {
            return res.status(400).json({message: "password not matched"})
          }
        const hashPassword = await bcrypt.hash(req.body.password,10)
        const user = {
            firstName :req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone:req.body.phone,
            country: req.body.country,
            state:req.body.state ,
            city: req.body.city,
            password :hashPassword,
            status : "verification pending",
            role : "user",
         }; 
    
            try{
             const data = await User.create(user);
            res.status(201).json({ 
              "message":"User Created Successfully!!!",
              info :data
            });
          }
          catch(err){
            res.status(400).json( {error :"check your details"});
          }
          },

    emailverification : async(req,res)=>{

        const verify = await User.findOne({where: {email: req.body.email}})
        
        if(!verify){
            return res.status(400).json({error : "email does not match"});
        }
          try{
            const otp = randomNumber.numberGenerator();
            await mailer.emailer(verify.email,otp);
            return res.status(200).json({message : "verification process initiated check out your email"})
          }
          catch(err){
            return res.status(500).json({error : err})
          }
   },
   
   
     accountverification : async(req,res)=>{

     }
}