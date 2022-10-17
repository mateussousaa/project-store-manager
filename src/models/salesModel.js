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

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = { getSales, getSaleById, deleteSale };