require('dotenv').config();

const pk = process.env.STRIPE_PUBLIC_KEY;

const sk =  process.env.STRIPE_SECRET_KEY;

const stripe = require(stripe)(sk);




