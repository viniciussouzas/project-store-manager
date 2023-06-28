const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productFromDb } = require('../mocks/products.mock');

describe('Realizando testes da camada products model', function () {
  it('Testa se a função findAll possui o comportamento esperado', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    
    const responseModel = await productsModel.findAll();

    expect(responseModel).to.be.an('array');
    expect(responseModel).to.be.deep.equal(productsFromDB);
  });

  it('Testa se a função findById possui o comportamento esperado', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDb]]);
    
    const productId = 1;
    const responseModel = await productsModel.findById(productId);

    expect(responseModel).to.be.an('array');
    expect(responseModel).to.be.deep.equal(productFromDb);
  });

  afterEach(function () {
    sinon.restore();
  });
});