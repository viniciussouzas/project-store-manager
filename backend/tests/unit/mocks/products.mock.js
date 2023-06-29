const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productFromDb = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

const productFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

const productFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: productFromModel,
};

module.exports = {
  productsFromDB,
  productFromDb,
  productsFromModel,
  productFromModel,
  productFromServiceNotFound,
  productFromServiceSuccessful,
  productsFromServiceSuccessful,
  productFromServiceCreated,
};