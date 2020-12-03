const express = require('express');
const productController = require('../controllers/productsController');
const multer = require('multer');

const upload = multer({storage:multer.memoryStorage()});

const router = new express.Router();

router.route('/').post(upload.single('image'),productController.addProduct)
.get(productController.getProduct);

module.exports = router;