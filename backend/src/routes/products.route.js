const route = require('express').Router();

const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

route.get('/', productsController.listProducts);
route.get('/:productId', productsController.listProductsById);
route.post('/', validateProductName, productsController.createProduct);

module.exports = route;