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

const update = async (productObj, productId) => {
  const { name } = productObj;

  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;', 
    [name, productId],
  );

  const idProduct = await findById(productId);

  return idProduct;
};

const deleteFrom = async (productId) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?;',
    [productId],
  );
};

module.exports = {
  findAll,
  findById,
  insertInto,
  update,
  deleteFrom,
};