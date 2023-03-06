<<<<<<< HEAD
const router= require('express').Router();
const auth = require('../middleware/userAuth')
=======
const router=require('express').Router();

>>>>>>> parent of 300f926 (added cart schema)
const userController = require('../controllers/user');



//SIGNIP ROUTERS

router.post('/signup',userController.signup);
router.post('/emailverification',userController.emailverification);
router.post('/accountverification',userController.accountverification);

<<<<<<< HEAD

// LOGIN ROUTERS

router.post('/login',userController.login);


//  PRODUCT ROUTERS
=======
// PRODUCT ROUTERS
>>>>>>> parent of 300f926 (added cart schema)

router.post('/seller/addProduct',auth.userAuth , userController.addProduct);
router.delete ('/seller/deleteProduct',userController.deleteProduct);




module.exports = router;

