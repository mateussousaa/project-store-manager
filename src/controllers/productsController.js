const { productsService } = require('../services');

const listProducts = async (_request, response) => {
  const products = await productsService.getProducts();
  response.status(200).json(products);
};

const listProductById = async (request, response) => {
  const { id } = request.params;
  const { type, message } = await productsService.getProductById(Number(id));
  if (type) return response.status(404).json({ message });
  response.status(200).json(message);
};

const addProduct = async (request, response) => {
  const { name } = request.body;
  const { message } = await productsService.insertProduct({ name });

  response.status(201).json({ id: message, name });
};

const updateProduct = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  const { type, message } = await productsService.updateProduct({ id: Number(id), name });
  if (type) return response.status(404).json({ message });
  response.status(200).json({ ...message });
};

module.exports = { listProducts, listProductById, addProduct, updateProduct };
