const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_request, response) => {
  const products = await productsService.getProducts();
  response.status(200).json(products);
};

const listProductById = async (request, response) => {
  const { id } = request.params;
  const { type, message } = await productsService.getProductById(Number(id));
  if (type) return response.status(errorMap.mapError(type)).json({ message });
  response.status(200).json(message);
};

const addProduct = async (request, response) => {
  const { name } = request.body;
  const { type, message } = await productsService.insertProduct({ name });

  if (type) return response.status(errorMap.mapError(type)).json({ message });

  response.status(201).json({ id: message, name });
};

module.exports = { listProducts, listProductById, addProduct };
