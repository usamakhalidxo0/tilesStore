const catchAsync = require('../others/catchAsync');
const Product = require('../models/Product');

exports.addProduct = catchAsync(async function(req,res,next){
    const product = Product.create({name:req.body.name, image:req.file.buffer, description:req.body.description});
    console.log(product);
    res.send('response');
})

exports.getProduct = catchAsync(async function(req,res,next){
    const product = await Product.findOne({name:'tile3'});
    res.json({
        product
    });
})