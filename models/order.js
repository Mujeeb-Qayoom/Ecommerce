const { where } = require('sequelize');
const orderSchema = require('../schema/orderSchema.js');

module.exports = {

    orderNow : async(data) =>{
            
        const result = await orderSchema.create(data);

        if(result){
            return true;
        }
        else{
            return false;
        }
    },

    delete : async(req) =>{

        const result = await orderSchema.destroy({where :{
            userId: req.user.userId,
            orderId : req.body.orderId
        }});

        if(result) {
            return true;
        }
            return false;
    },

    getAll : async() => {
        const orders = await orderSchema.findAll();

        if(orders){
            return orders;
        }   
            return false;
    },

    confirm : async(req) =>{

        const result = await orderSchema.update({ status: "confirmed" }, { where: { orderId: req.body.orderId }});

        if(result) {
            return true;
        }
            return false;

         
    }
}