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

const insertProduct = async (product) => {
  if (!product.name) {
    return {
      type: 'NAME_IS_REQUIRED', message: '"name" is required',
    };
  }
  
  if (product.name.length < 5) {
    return {
      type: 'NAME_IS_TOO_SHORT', message: '"name" length must be at least 5 characters long',
    };
  }

  const insertId = await productsModel.insertProduct(product);
  return { type: null, message: insertId };
};

module.exports = { getProducts, getProductById, insertProduct };