const { productsModel } = require('../models');

const getProducts = async () => { 
  const products = await productsModel.getProducts();
  return products.sort((a, b) => a.id - b.id);
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = { getProducts, getProductById };