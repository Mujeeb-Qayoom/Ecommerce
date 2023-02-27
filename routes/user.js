const router=require('express').Router();

const userController = require('../controllers/user');



//SIGNIP ROUTERS

router.post('/signup',userController.signup);
router.post('/emailverification',userController.emailverification);
router.post('/accountverification',userController.accountverification);

// PRODUCT ROUTERS

router.post('/seller/addProduct',userController.addProduct);
router.delete ('/seller/deleteProduct',userController.deleteProduct);

module.exports = router;

