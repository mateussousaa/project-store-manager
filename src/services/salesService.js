const camelize = require('camelize');
const snakeize = require('snakeize');
const { salesModel, productsModel } = require('../models');

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales.map((s) => camelize(s));
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale.length) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale.map((s) => camelize(s)) };
};

const insertSale = async (products) => {
  const getProducts = products
    .map((p) => productsModel.getProductById(p.productId));
  const productsResponse = await Promise.all(getProducts);

  const productsValidation = productsResponse.every((p) => p !== undefined);
  
  if (!productsValidation) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const id = await salesModel.createSale();
  const promises = products.map((s) => salesModel.fillSale(snakeize({ saleId: id, ...s })));
  await Promise.all(promises);
  return {
    type: null,
    message: {
      id,
      itemsSold: [...products],
    },
  };
};

const deleteSale = async (id) => {
  const findedSale = await salesModel.getSaleById(id);
  if (!findedSale.length) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  await salesModel.deleteSale(id);
  return { type: null, message: id };
};

module.exports = { getSales, getSaleById, insertSale, deleteSale };