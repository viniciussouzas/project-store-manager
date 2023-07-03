const { salesModel, productsModel } = require('../models');
const { validateSalesFields } = require('./validations/validateSalesFields');

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

const insertSale = async (saleObj) => {
  const error = validateSalesFields(saleObj);

  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const products = await Promise.all(saleObj.map(async (sale) => {
    const result = await productsModel.findById(sale.productId);

    return result;
  }));

  if (products.some((found) => !found)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const data = await salesModel.insertInto(saleObj);

  return { status: 'CREATED', data };
};

module.exports = {
  getAllSales,
  getSalesById,
  insertSale,
};