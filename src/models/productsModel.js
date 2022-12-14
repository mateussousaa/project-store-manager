const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE products.id = ?', [id],
  );
  return result;
};

const getProductByTerm = async (term) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name LIKE ?`,
    [`%${term}%`],
  );
  return result;
};

const insertProduct = async (product) => {
  const columns = Object.keys(product)
    .map((key) => `${key}`)
    .join(', ');
  
  const placeholders = Object.values(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholders})`,
    [...Object.values(product)],
  );
  return insertId;
};

const updateProduct = async (product) => {
  const { name, id } = product;
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  getProducts,
  getProductById,
  getProductByTerm,
  insertProduct,
  updateProduct,
  deleteProduct,
};