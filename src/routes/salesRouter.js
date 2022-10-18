const express = require('express');

const { salesController } = require('../controllers');
const validateSale = require('../middlewares/validateSale');
 
const router = express.Router();

router.get('/', salesController.listSales);

router.get('/:id', salesController.listSaleById);

router.post('/', validateSale, salesController.insertSale);

router.put('/:id', validateSale, salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;