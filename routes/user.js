const router=require('express').Router();

const userController = require('../controllers/user');




router.post('/signup',userController.signup);

router.post('/emailverification',userController.emailverification);

router.post('/accountverification',userController.accountverification);

module.exports = router;

