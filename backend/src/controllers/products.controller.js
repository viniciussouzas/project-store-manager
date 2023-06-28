const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const listProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();

  return res.status(mapStatusHTTP(status)).json(data);
};

const listProductsById = async (req, res) => {
  const { productId } = req.params;

  const { status, data } = await productsService.getProductsById(productId);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listProducts,
  listProductsById,
};