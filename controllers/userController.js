const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const otpMOdel = require('../models/otp');
const mailer = require('../helpers/mailer');
const randomNumber = require('../helpers/randamNo');
const userSchema = require('../schema/userSchema');
const response = require('../helpers/responseHandler');
const auth = require('../middleware/userAuth');

module.exports = {

  signup : async (req, res) => {

    const checkemail = await userSchema.findOne({ where: { email: req.body.email } });
    if (checkemail) {
      return res.status(409).json({ error: "email already exists" });
    }

   if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "password not matched" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      password: hashPassword,
      status: "verification pending",
      role: req.body.role,
    };
   try {
      const data = await userModel.signup(user);
      console.log(data);
      if (data) {
        return response.successResponse(req,res,201,"created sucessfully")
      }
      else {
        return response.errorResponse(req,res,400,"check your details and try again")
      }
    }
    catch (err) {
        return response.serverResponse(res,500,"server error");
    }
  },

  emailverification: async (req, res) => {
  
    const verify = await userSchema.findOne({ where: { email: req.body.email } });

    if (!verify) {
      return res.status(400).json({ error: "email does not match" });
    }
    try {
      const otp = randomNumber.numberGenerator();
      const validityPeriod = 5 * 60 * 1000;
      const expiresAt = new Date(Date.now() + validityPeriod);

      const data = await otpMOdel.emailverification(otp, verify.userId, verify.createdAt, expiresAt);
      await mailer.emailer(verify.email, otp);
      return res.status(200).json({ message: "Process initiated check out your email", data });
    }
    catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  accountverification: async (req, res) => {

    const data = await userSchema.findOne({ where: { email: req.body.email } });
    if (!data) {
      return res.status(404).json({ error: "email not matched" })
    }
    const verify = await otpMOdel.accountVerification(data.userId, req.body.otp);
    if (verify) {

      await userSchema.update({ status: 'verified' },{ where: { userId: data.userId }});
      await mailer.verifyMail(data.email);
      res.status(201).json({ message : "account verified" });
    }
    else {
      res.status(500).json({ error : "verification failed" });
    }
  },

  resetPassword : async(req,res) =>{
    const data = await userSchema.findOne({where :{ email : req.body.email}});
    if(!data) {
      return res.status(404).json({ error: "email not matched" });
    }

    const verify = await otpMOdel.accountVerification(data.userId, req.body.otp);
    if (verify) {
      const hashPassword = await bcrypt.hash(req.body.password, 10)
      await userSchema.update({password : hashPassword},{ where: { userId: data.userId }});
      res.status(201).json({ message : "password changed sucessfully" });
    }
    else {
      res.status(500).json({ error : "unable to update password" });
    }
  },

  login : async (req,res) =>{

       try{
         const user = await userModel.userLogin(req);
        if(user){
         const token = await auth.generateToken(user.userId);
         return response.successResponse(req,res,200,token);
        }
         return response.errorResponse(req,res,400,"invalid credentials");
       }
      catch(err){
           return response.serverResponse(res,500,"server error");
      }
  },

  logout : async (req,res) => {
    
    try{
    return response.successResponse(req,res,200, "account logout");
    }
      catch(error){
      return response.serverResponse(res,500,"server error");
    }
  },

  getAllsellers : async(req,res) =>{

    const result = await userModel.getUsers(req.body.role);

    if(result) {
      return response.successResponse(req,res,200,result);
    }
      return response.errorResponse(req,res,400,"no data found");
  },

  deleteUser : async(req,res) =>{

    const result = await userModel.deleteUser(req.body.userId);
     
    if(result) {
      return response.successResponse(req,res,200,"user deleted Sucessfully");
    }
      return response.errorResponse(req,res,400,"user not found");
  }
}
