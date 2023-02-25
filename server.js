require('dotenv').config();
require('./config/db');
const UserRouter = require('./routes/user')
const port = process.env.PORT || 3030
const express = require('express');
const app =  express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}))
app.use(UserRouter);

app.listen(port,()=>{
    console.log("listening to the port ",port)
});

