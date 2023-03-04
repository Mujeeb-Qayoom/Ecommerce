const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const otpMOdel = require('../models/otp');
const productModel = require('../models/product')
const cartModel = require('../models/cart')
const mailer = require('../helpers/mailer')
const randomNumber = require('../helpers/randamNo');
const userSchema = require('../schema/userSchema')
const otpSchema = require('../schema/otpSchema')
const response = require('../helpers/responseHandler')


module.exports = {

  signup: async (req, res) => {

    const checkemail = await userSchema.findOne({ where: { email: req.body.email } })
    
    if (checkemail) {
      return res.status(409).json({ error: "email already exists" })
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "password not matched" })
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10)

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
      role: "user",
    };

 try {
      const data = await userModel.signup(user);
       if (data) {
          res.status(201).json({
          "message": "User Created Successfully!!!",
          info: data
        });
      }
        else {
        res.status(500).json({ error: "check your details" });
        }
}
   catch (err) {
      res.status(400).json({ error: "check your details" });
  }
  },

  emailverification: async (req, res) => {

    const verify = await userSchema.findOne({ where: { email: req.body.email } })

      if (!verify) {
      return res.status(400).json({ error: "email does not match" });
       }

    try {
      const otp = randomNumber.numberGenerator();
      await mailer.emailer(verify.email, otp);

      const validityPeriod = 5 * 60 * 1000;
      const expiresAt = new Date(Date.now() + validityPeriod);

      const data = await otpMOdel.emailverification(otp, verify.userId, verify.createdAt, expiresAt);
      return res.status(200).json({ message: "verification process initiated check out your email", data })
    }
    catch (err) {
      return res.status(500).json({ error: err })
    }
  },

  accountverification: async (req, res) => {

    const data = await userSchema.findOne({ where: { email: req.body.email } })
    if (!data) {
      return res.status(404).json({ error: "email not matched" })
     }
    const verify = await otpMOdel.accountVerification(data.userId, req.body.otp);

    if (verify) {
      await userSchema.update({ status: 'verified' }, { where: { userId: data.userId } })
      await userSchema.afterSave();
      await mailer.verifyMail(data.email);
      res.status(201).json({ message: "account verified" })
    }
    else {
      res.status(500).json({ error: "verification failed" })
     }
  },

  addProduct: async (req, res) => {
    const data = {
      userId: req.body.userId,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      status: req.body.status,
      catagory: req.body.catagory,
    }
    try {
      const result = await productModel.add(data);
      if (result) {
        return response.successResponse(req, res, 200, "product added")
        // return res.status(200).json({message : "product added sucessfully"})
      }
      return response.errorResponse(req, res, 400, error.message)
      // return res.status(400).json({error : "unable to add product"})
    }
       catch (err) {
       return response.serverResponse(res, 500, "server error")
      //return res.status(500).json({error : "server error"})
    }
  },

  deleteProduct: async (req, res) => {

    try {
      const result = await productModel.delete(req.body.productId);
      if (result) {
        return res.status(201).json({ message: "product deleted sucessfully" })
      }
       else {
        return res.status(404).json({ message: "product not found" })
      }
    }
     catch (error) {
       return res.status(500).json({ message: "server error" })
     }
  },

  showProduct : async (req,res) =>{
    try{
      const result = await productModel.showProducts();
      if(result){
        return response.successResponse(req,res,200,result)
      }
        else {
        return response.errorResponse(req,res,404)
       }
     }
    catch(error){
      return response.serverResponse(res,500,error);
     }
  },

  updateProduct : async (req,res) =>{

    try {
    const result = await productModel.updateProducts(req.body.id,req.body.price);

    if(result){
      return response.successResponse(req,res,200,result)
    }

    else{
      return response.errorResponse(req,res,404)
    }
  } 
  catch(error){
    return response.serverResponse(res,500,error)
  }
 },

 addToCart : async(req,res) => {
 
 const user = await cartModel.findUser(req.body.userId)
  
  if (!user)  {

  const data = {
    totalPrice : req.body.totalPrice,
    quantity : req.body.quantity,
    status :req.body.status,
    discount : req.body.discount,
    userId : req.body.userId,
    productId : req.body.productId
  }
  const result = await cartModel.add(data);

   if(result){
    return response.successResponse(req,res,200,result);
   }
   else{
    return response.errorResponse(req,res,404);
   }
 }
 else {
      return res.json({message : "cart already exixts for the same user"});
   }
},
}
