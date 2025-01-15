const express = require('express');
const productsController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productsController.getProducts);

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

router.get('/edit-product/:productId', productsController.getEditProduct);

router.post('/edit-product', productsController.postEditProduct);

router.post('/delete-product', productsController.postDeleteProduct);

module.exports = router;

