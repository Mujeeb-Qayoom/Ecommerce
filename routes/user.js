const router= require('express').Router();

const auth = require('../middleware/userAuth');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const ordercontroller = require('../controllers/orderController');
const paymentController = require('../controllers/paymentController')

// SIGNUP ROUTERS..
router.post('/signup',userController.signup);
router.post('/emailverification',userController.emailverification);
router.post('/accountverification',userController.accountverification);
router.post('/forgotPassword',userController.emailverification);
router.post('/resetPassword',userController.resetPassword)


// LOGIN ROUTER...
router.post('/login',userController.login);

// LOGOUT ROUTER...
//router.post('/logout',auth.userAuth , userController.logout);

// PRODUCT ROUTERS..
router.post('/seller/addProduct',auth.sellerAuth,productController.addProduct);
router.delete('/seller/deleteProduct',auth.sellerAuth,productController.deleteProduct);
router.get('/seller/myProducts',auth.sellerAuth,productController.myProducts);

// CART ROUTERS..
router.post('/user/cart/addToCart',auth.userAuth,cartController.addToCart);
router.post('/user/cart/moveToSaveLater',auth.userAuth,cartController.moveToSaveLater);
router.get('/user/cart/myCart',auth.userAuth,cartController.myCart);
router.delete('/user/cart/deleteFromCart',auth.userAuth,cartController.deleteFromCart)
router.post('/user/searchProducts',auth.userAuth,productController.searchProducts);

//ORDER ROUTES..
router.post('/user/cart/proceedToBuy',auth.userAuth, ordercontroller.proceedToBuy);
router.delete('/user/cart/deleteOrder',auth.userAuth,ordercontroller.deleteOrder);

//PAYMENT ROUTERS..
router.post('/user/order/payment',auth.userAuth,paymentController.payment);


// ADMIN ROUTERS..
router.get('/admim/getAllSellers',auth.adminAuth,userController.getAllsellers);
router.get('/admin/getAllProducts',auth.adminAuth,productController.getAllProducts);
router.get('/admin/getAllOrders',auth.adminAuth,ordercontroller.getAllOrders);
router.post('/admin/confirmOrder',auth.adminAuth,ordercontroller.confirmOrder);
router.delete('/admin/deleteUser',auth.adminAuth,userController.deleteUser);

module.exports = router;

