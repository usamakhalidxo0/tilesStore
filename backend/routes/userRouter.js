const express = require('express');
const userController = require('../controllers/userController');
const productRouter = require('./productRouter');
const CustomError = require('../others/CustomError');

const router = new express.Router();

router.post('/',userController.signIn);
router.post('/sign-up',userController.signUp);
router.post('/forgot-password', userController.forgotPassword);
router.post('/password-reset/:email/:token', userController.passwordReset);
router.use(userController.authenticate);
router.route('/').get(userController.getMe).patch(userController.updateMe);
router.route('/logout').get(userController.logOut);
router.post('/update-password',userController.updatePassword);

router.use('/products/',productRouter);

router.use(function(req,res,next){
    next(new CustomError(`Route not found`,404));
});

module.exports= router;