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

const insertSale = async (req, res) => {
  const { type, message } = await salesService.insertSale(req.body);
  if (type) return res.status(404).json({ message });
  res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.updateSale(req.body, Number(id));
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(Number(id));
  if (type) return res.status(404).json({ message });
  res.status(204).json();
};

module.exports = { listSales, listSaleById, insertSale, updateSale, deleteSale };