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

const insertProduct = async (productObj) => {
  const data = await productsModel.insertInto(productObj);

  return { status: 'CREATED', data };
};

const updtProduct = async (productObj, productId) => { 
  const checkId = await getProductsById(productId);

  if (checkId.status !== 'SUCCESSFUL') {
    return { status: checkId.status, data: { message: checkId.data.message } };
  }

  const data = await productsModel.update(productObj, productId);

  return { status: 'SUCCESSFUL', data };
};

const deleteProduct = async (productId) => {
  const { status, data } = await getProductsById(productId);

  if (status !== 'SUCCESSFUL') {
    return { status, data: { message: data.message } };
  }

  await productsModel.deleteFrom(productId);

  return { status: 'DELETED' };
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
  updtProduct,
  deleteProduct,
};