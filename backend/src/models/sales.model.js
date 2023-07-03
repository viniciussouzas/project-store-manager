const snakeize = require('snakeize');

const connection = require('./connection');
const { getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [salesProducts] = await connection.execute(
    `SELECT sp.sale_id saleId, s.date, sp.product_id productId, sp.quantity
      FROM sales_products sp
      JOIN sales s ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id;`,
  );

  return salesProducts;
};

const findById = async (saleId) => {
  const [salesProduct] = await connection.execute(
    `SELECT s.date, sp.product_id productId, sp.quantity
      FROM sales s 
      JOIN sales_products sp ON s.id = sp.sale_id
      WHERE s.id = ? 
      ORDER BY s.id, product_id;`,
    [saleId],
    );
  return salesProduct;
};

const salesProductsInsert = async (sale, insertId) => {
  let promises = [];

  const placeholders = getFormattedPlaceholders(sale);

  promises = sale.map((column) => {
    const columns = Object.keys(snakeize(column)).join(', ');
    const values = Object.values(column);
    
    return connection.execute(`INSERT INTO sales_products (sale_id, ${columns})
      VALUE (?, ${placeholders});`, [insertId, ...values]);
  });

  await Promise.all(promises);
};

const insertInto = async (saleObj) => {
  const date = new Date();

  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUE (?);', [date]);

  await salesProductsInsert(saleObj, insertId);

  return {
    id: insertId,
    itemsSold: saleObj,
  };
};

module.exports = {
  findAll,
  findById,
  insertInto,
};