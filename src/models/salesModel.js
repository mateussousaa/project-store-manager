const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON sp.sale_id = s.id
    ORDER BY sale_id ASC, product_id ASC;`,
  );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON sp.sale_id = s.id
    WHERE sale_id = ?
    ORDER BY sale_id ASC, product_id ASC
    `,
    [id],
  );
  return result;
};

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return insertId;
};

const fillSale = async (sale) => {
  const columns = Object.keys(sale)
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.values(sale)
    .map((_key) => '?')
    .join(', ');

  const [{ affectedRows }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}) VALUES (${placeholders})`,
    [...Object.values(sale)],
  );
  return affectedRows;
};

const updateSale = async (sale) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products 
    SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [sale.product_id, sale.quantity, sale.id, sale.product_id],
  );
  return affectedRows;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = { getSales, getSaleById, createSale, fillSale, updateSale, deleteSale };