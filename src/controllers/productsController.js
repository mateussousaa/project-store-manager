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

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.insertProduct({ name });
  res.status(201).json({ id: message, name });
};

module.exports = { listProducts, listProductById, addProduct };
