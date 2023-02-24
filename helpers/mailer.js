const nodemailer = require('nodemailer');
module.exports ={
      emailer : async (Newmail,otp) => {
const transporter = nodemailer.createTransport({

        service: "hotmail",
        auth:{
            user : "mujeebqayoom@outlook.com",
            pass : "@M01942406085"    
        },
       tls: {
               rejectUnauthorized :false
            }
    });
    const options = {
    from : "mujeebqayoom@outlook.com",
    to : Newmail,
    subject: "Ecommerce",
    text : `welcome to our website and your otp is ${otp}`
    }

transporter.sendMail(options,(err,info)=>{

    if(err){
        return console.log(err);
    }
    console.log(info.response);
  })
    }


    // deletionMailer: (mail) => {


    //     const transporter = nodemailer.createTransport({

    //         service: "hotmail",
    //         auth: {
    //             user: "mujeebqayoom@outlook.com",
    //             pass: "@M01942406085"
    //         },
    //         tls: {
    //             rejectUnauthorized: false
    //         }
    //     });

    //     const options = {
    //         from: "mujeebqayoom@outlook.com",
    //         to: mail,
    //         subject: "Task Manager App",
    //         text: "your account has been deleted"
    //     }
    //     transporter.sendMail(options, (err, info) => {

    //         if (err) {
    //             return console.log(err);
    //         }

    //         console.log(info.response);
    //     })
    // }
}
