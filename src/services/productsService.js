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
  const insertId = await productsModel.insertProduct(product);
  return { type: null, message: insertId };
};

const updateProduct = async (product) => {
  const findedProduct = await productsModel.getProductById(product.id);
  if (!findedProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.updateProduct(product);
  return { type: null, message: product };
};

const deleteProduct = async (id) => {
  const findedProduct = await productsModel.getProductById(id);
  if (!findedProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { type: null, message: id };
};

module.exports = { getProducts, getProductById, insertProduct, updateProduct, deleteProduct };