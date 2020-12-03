const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        lowercase:true,
        required:[true, 'Please give your email'],
        validate:[validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        select:false,
        minlength: [8, 'Password should be at least 8 charecters long'],
        required:[true, 'Please give your Passord']
    },
    role: {
        type:String,
        enum:['customer','vendor'],
        required:[true, 'Role is required'],
    },
    passwordResetToken:{
        type:String,
        select:false
    },
    passwordResetExpire:{
        type:Date,
        select:false
    }
},{
    validateBeforeSave:true,
    toJSON:{virtuals:true}
});

userSchema.methods.correctPassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 6);
    }
    next();
})

userSchema.methods.forgotPassword = function (){
   const token = crypto.randomBytes(16).toString('hex');
   this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
   this.passwordResetExpire = Date.now()+1000*60*60;
   return token;
}

const User = new mongoose.model('User', userSchema);

module.exports = User;