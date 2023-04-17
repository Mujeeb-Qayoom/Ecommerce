require('./config/db');
const auth = require('./middleware/userAuth');
const UserRouter = require('./routes/user')
const express = require('express');
const app =  express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}))
app.use(UserRouter);


module.exports = app;