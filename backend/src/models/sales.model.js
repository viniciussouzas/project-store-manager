const connection = require('./connection');

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

module.exports = {
  findAll,
  findById,
};