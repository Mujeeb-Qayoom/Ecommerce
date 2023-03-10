const router= require('express').Router();
const auth = require('../middleware/userAuth')
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

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

// CART ROUTERS

router.post('/user/cart/addToCart',auth.userAuth , cartController.addToCart);
router.post('/user/cart/moveToSaveLater',auth.userAuth , cartController.moveToSaveLater);
router.get('/user/cart/myCart', auth.userAuth , cartController.myCart);

router.post('/user/searchProducts', auth.userAuth ,  productController.searchProducts);


module.exports = router;

