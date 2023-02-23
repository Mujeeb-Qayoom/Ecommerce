require('dotenv').config();
require('./config/db');
 const User = require('./models/user');
 const bcrypt = require('bcrypt');

const express = require('express');
const app =  express();
app.use(express.json());
//app.use(express.urlencoded({extended:true}))


const port = process.env.PORT || 3030;

app.post('/signup', async(req,res) => {

    console.log(req.body.password);
   
    if(req.body.password !== req.body.confirmPassword)
    {
        return res.status(400).json({message: "password not match"})
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

       // try{
         const data = await User.create(user);
        res.status(201).json({ 
          "message":"User Created Successfully!!!",
          info :data
        });
     // }
      // catch(err){
      //   res.status(400).send("check your details");
      // }
       })


app.listen(port,()=>{
    console.log("listening to the port ",port)
})