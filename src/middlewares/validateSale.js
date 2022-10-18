const validateSale = async (req, res, next) => {
  if (!req.body.length) return res.status(400).json({ message: 'EMPTY' });

  const validateProductId = req.body.every((sale) => sale.productId !== undefined);
  if (!validateProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  const validateQuantity = req.body.every((sale) => sale.quantity !== undefined);
  if (!validateQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  const quantityGreaterThanZero = req.body.every((sale) => sale.quantity > 0);
  if (!quantityGreaterThanZero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = validateSale;
