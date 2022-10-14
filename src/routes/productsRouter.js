const express = require('express');
const validateName = require('../middlewares/validateName');
const {
  productsController,
} = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.listProductById);

router.post('/', validateName, productsController.addProduct);

router.put('/:id', validateName, productsController.updateProduct);

module.exports = router;
