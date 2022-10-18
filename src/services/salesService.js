const camelize = require('camelize');
const snakeize = require('snakeize');
const { salesModel } = require('../models');
const validateProducts = require('./validations/productsValidation');

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
  const productsValidation = await validateProducts(products);
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

const updateSale = async (products, id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const productsValidation = await validateProducts(products);
  if (!productsValidation) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }
  
  const promises = products.map((s) =>
    salesModel.updateSale(snakeize({ id, ...s })));
  await Promise.all(promises);
  return {
    type: null,
    message: {
      saleId: id,
      itemsUpdated: [...products],
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

module.exports = { getSales, getSaleById, insertSale, updateSale, deleteSale };