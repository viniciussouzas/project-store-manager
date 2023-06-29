const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );

  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [productId],
    );
  return product;
};

const insertInto = async (productObj) => {
  const { name } = productObj;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?);',
    [name],
  );

  return {
    id: insertId,
    name,
  };
};

module.exports = {
  findAll,
  findById,
  insertInto,
};