const { productsModel } = require('../../models/index');

const validateProducts = async (products) => {
  const getProducts = products.map((p) =>
    productsModel.getProductById(p.productId));
  const productsResponse = await Promise.all(getProducts);

  return productsResponse.every((p) => p !== undefined);
};

module.exports = validateProducts;