const { productsModel } = require('../models');

const getAllProducts = async () => {
  const data = await productsModel.findAll();

  return { status: 'SUCCESSFUL', data };
};

const getProductsById = async (productId) => {
  const data = await productsModel.findById(productId);

  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  } 

  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  getAllProducts,
  getProductsById,
};