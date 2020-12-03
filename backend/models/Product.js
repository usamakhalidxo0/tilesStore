const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide the name of product'],
    },
    image:Buffer,
    description:{
        type:String
    }
});

const Product = new mongoose.model('Product',productSchema);

module.exports = Product;