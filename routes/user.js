const router= require('express').Router();
const auth = require('../middleware/userAuth')
const userController = require('../controllers/user');



//SIGNIP ROUTERS

router.post('/signup',userController.signup);
router.post('/emailverification',userController.emailverification);
router.post('/accountverification',userController.accountverification);


// LOGIN ROUTERS

router.post('/login',userController.login);


//  PRODUCT ROUTERS

router.post('/seller/addProduct',auth.userAuth , userController.addProduct);
router.delete ('/seller/deleteProduct',userController.deleteProduct);




module.exports = router;

