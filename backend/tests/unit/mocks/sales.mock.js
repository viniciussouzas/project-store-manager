const DATE_TIME = '2023-06-29T12:46:43.000Z';

const salesFromDB = [
  {
    saleId: 1,
    date: DATE_TIME,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE_TIME,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: DATE_TIME,
    productId: 3,
    quantity: 15,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date: DATE_TIME,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE_TIME,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: DATE_TIME,
    productId: 3,
    quantity: 15,
  },
];

const saleFromDb = [
  {
    date: DATE_TIME,
    productId: 1,
    quantity: 5,
  },
];

const saleInsertFromDb = [
  {
    id: 2,
    itemsSold: [{ productId: 3, quantity: 15 }],
  },
];

const saleInsertFromModel = [
  {
    id: 2,
    itemsSold: [{ productId: 3, quantity: 15 }],
  },
];

const saleInvalidInsertFromModel = [
  {
    id: 2,
    itemsSold: [{ productId: 99, quantity: 15 }],
  },
];

const saleEmptyInsertFromModel = [
  {
    id: 2,
    itemsSold: [{ quantity: 15 }],
  },
];

const saleFromModel = [
  {
    date: DATE_TIME,
    productId: 1,
    quantity: 5,
  },
];

const salesFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};

const salesFromServiceRequired = {
  status: 'REQUIRED_VALUE',
  data: { message: 'message' },
};

const salesFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const saleFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleFromServiceCreated = {
  status: 'CREATED',
  data: saleInsertFromModel,
};

module.exports = {
  salesFromDB,
  saleFromDb,
  salesFromModel,
  saleFromModel,
  salesFromServiceNotFound,
  salesFromServiceRequired,
  saleFromServiceSuccessful,
  salesFromServiceSuccessful,
  saleFromServiceCreated,
  saleInsertFromDb,
  saleInsertFromModel,
  saleInvalidInsertFromModel,
  saleEmptyInsertFromModel,
};