const express = require('express');

const { salesController } = require('../controllers');
 
const router = express.Router();

router.get('/', salesController.listSales);

router.get('/:id', salesController.listSaleById);

router.delete('/:id', salesController.deleteSale);

module.exports = router;