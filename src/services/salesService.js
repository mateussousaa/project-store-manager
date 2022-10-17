const camelize = require('camelize');
const { salesModel } = require('../models');

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

const deleteSale = async (id) => {
  const findedSale = await salesModel.getSaleById(id);
  if (!findedSale.length) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  await salesModel.deleteSale(id);
  return { type: null, message: id };
};

module.exports = { getSales, getSaleById, deleteSale };