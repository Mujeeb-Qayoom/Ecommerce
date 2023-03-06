module.exports   = {
<<<<<<< HEAD
    successResponse : (req, res, code, data) => {
    res.json({code,data,success: true})
  },
  errorResponse : (req,res,code,error)=>{
=======
    successResponse : (req, res, code, data) => 
    res.json({code,data,success: true,
  }),

  errorResponse : (req,res,code)=>{
>>>>>>> parent of 300f926 (added cart schema)
    res.json({code,error,sucess:false})
  },

  serverResponse :(res,code,message)=>{
    res.json({code, message,sucess:false})

},
}