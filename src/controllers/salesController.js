const { salesService } = require('../services');

const listSales = async (_req, res) => {
  res.status(200).json(await salesService.getSales());
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(Number(id));
  if (type) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(message);
};

module.exports = { listSales, listSaleById };