const { salesModel } = require('../models');

const getAllSales = async () => {
  const data = await salesModel.findAll();

  return { status: 'SUCCESSFUL', data };
};

const getSalesById = async (saleId) => {
  const data = await salesModel.findById(saleId);

  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  } 

  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  getAllSales,
  getSalesById,
};