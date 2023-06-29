const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const listSales = async (_req, res) => {
  const { status, data } = await salesService.getAllSales();

  return res.status(mapStatusHTTP(status)).json(data);
};

const listSalesById = async (req, res) => {
  const { saleId } = req.params;

  const { status, data } = await salesService.getSalesById(saleId);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listSales,
  listSalesById,
};