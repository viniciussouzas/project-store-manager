const route = require('express').Router();

const { salesController } = require('../controllers');

route.get('/', salesController.listSales);
route.get('/:saleId', salesController.listSalesById);
route.post('/', salesController.createSale);

module.exports = route;