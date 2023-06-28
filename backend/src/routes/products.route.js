const route = require('express').Router();

const { productsController } = require('../controllers');

route.get('/', productsController.listProducts);
route.get('/:productId', productsController.listProductsById);

module.exports = route;