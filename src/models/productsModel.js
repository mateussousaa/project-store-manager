const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE products.id = ?', [id],
  );
  return result;
};

const insertProduct = async (products) => {
  const columns = Object.keys(products)
    .map((key) => `${key}`)
    .join(', ');
  
  const placeholders = Object.values(products)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholders})`,
    [...Object.values(products)],
  );
  return insertId;
};

module.exports = { getProducts, getProductById, insertProduct };