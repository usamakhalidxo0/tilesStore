const User = require('../models/User');
const catchAsync = require('../others/catchAsync');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const CustomError = require('../others/CustomError');
const crypto = require('crypto');
const sendMail = require('../others/email');

exports.signUp = catchAsync( async (req,res,next) => {
    if(req.body.password && (req.body.password = req.body.passwordConfirm)){
        const user = await User.create(req.body);
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge:90*24*60*60*1000
        });
        res.status(201).json({
            status:'success',
            message:'Signed Up!',
            user
        });
    }
    else next(new CustomError("Couldn't sign up. Please check your data!"));
});

exports.signIn = catchAsync( async (req, res, next) => {
    const user = await User.findOne({email:req.body.email}).select(`+password`);
    if(req.body.password && user && await user.correctPassword(req.body.password)){
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
        res.cookie('jwt', token, {
            httpOnly:true,
            maxAge:90*24*60*60*1000
        });
        res.status(200).json({
            status: "success",
            message: 'Signed In!'
        })
    }
    else next(new CustomError('user not found'));
});

exports.authenticate = catchAsync( async (req,res,next) => {
    let token;
    if(req.cookies && req.cookies.jwt)
        token = req.cookies.jwt;
    if(token){
        const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        const user = await User.findById(decode.id);
        if(user){
            req.user = user;
        }
    }
    else next(new CustomError('User not logged in!',404))
    next();
});

exports.getMe = catchAsync(async function(req,res,next) {
    if(req.user){
        res.status(200).json({
            status:"success",
            user:req.user
        });
    }
});

exports.logOut = catchAsync( async function(req,res,next) {
    res.cookie('jwt', '', {
        httpOnly:true
    }).status(203).send({
        status:"success",
        message:"logged out!"
    });
});

exports.updateMe = catchAsync(async function(req,res,next){
    const user = req.user;
    user.email = req.body.email;
    await user.save();
    res.status(200).json({
        status:"success",
        message:"Email set successfully!",
        user
    })
})

exports.updatePassword = catchAsync(async function(req,res,next){
    const user =await User.findOne(req.user).select('+password');
    if(req.body && req.body.oldPassword && req.body.password && req.body.passwordConfirm){
        if(await user.correctPassword(req.body.oldPassword) && (req.body.password===req.body.passwordConfirm)){
            user.password = req.body.password;
            await user.save();
            res.status(200).json({
                status:"success",
                message:"passwordUpdated"
            })
        }
        else next(new CustomError(`password couldn't be updated, check your data`,400))
    }
    else next(new CustomError(`Proper data not provided!`))
})

exports.forgotPassword=catchAsync(async function(req,res,next){
    const user = await User.findOne({email:req.body.email});
    if(user){
        const token = user.forgotPassword();
        await sendMail(req.body.email,token);
        user.save();
        res.status(200).json({
            status:"success",
            message:"Token Generated!"
        });
    }
    else next(new CustomError('User not Found!',404))
});

exports.passwordReset = catchAsync(async function(req,res,next){
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({email:req.params.email});
    if(user){
     if( user.passwordResetToken === hashedToken && Date.parse(user.passwordResetExpire) > Date.now()){
        if(req.body && req.body.password === req.body.passwordConfirm){
        user.passwordResetToken=null;
        user.passwordResetExpire=null;
        user.password=req.body.password;
        user.save();
        res.status(200).json({
            status:"success",
            message:"Password Updated!"
        })
        }
        else next(new CustomError(`Passwords don't match or not provided!`))
     }
     else next(new CustomError(`Invalid or expired token!`))
    }
    else next(new CustomError(`User not found!`))
})