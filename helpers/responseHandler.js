module.exports   = {
    successResponse : (req, res, code, data) => 
    res.json({code,data,success: true,
  }),

  errorResponse : (req,res,code)=>{
    res.json({code,error,sucess:false})
  },

  serverResponse :(res,code,message)=>{
    res.json({code, message,sucess:false})

},
}