const router= require('express').Router();
const auth = require('../middleware/userAuth')
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

//SIGNIP ROUTERS

router.post('/signup',userController.signup);
router.post('/emailverification',userController.emailverification);
router.post('/accountverification',userController.accountverification);

// LOGIN ROUTER

router.post('/login',userController.login);

// LOGOUT ROUTER

router.post('/logout',auth.userAuth , userController.logout);

//  PRODUCT ROUTERS

router.post('/seller/addProduct',auth.userAuth , productController.addProduct);
router.delete ('/seller/deleteProduct',productController.deleteProduct);
router.get('/seller/myProducts',auth.userAuth , productController.myProducts);


module.exports = router;

