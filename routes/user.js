const router= require('express').Router();
const auth = require('../middleware/userAuth')
const userController = require('../controllers/user');



//  SIGNIP ROUTERS

router.post('/signup',userController.signup);
router.post('/emailverification',userController.emailverification);
router.post('/accountverification',userController.accountverification);


// LOGIN ROUTERS

router.post('/login',userController.login);


//  PRODUCT ROUTERS

router.post('/seller/addProduct',auth.userAuth , userController.addProduct);
router.delete ('/seller/deleteProduct',userController.deleteProduct);
router.get('/seller/products',userController.showProduct);
router.post('/seller/updateProduct',userController.updateProduct);


//   CART ROUTERS

router.post('/user/addCart',userController.addToCart);




module.exports = router;

