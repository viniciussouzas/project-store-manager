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

  it('Testa se a função insertInto possui o comportamento esperado', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const productObj = {
      name: 'Martelo de Thor',
    };

    const responseModel = await productsModel.insertInto(productObj);

    expect(responseModel).to.be.an('object');
    expect(responseModel.id).to.be.deep.equal(1);
    expect(responseModel.name).to.be.deep.equal('Martelo de Thor');
  });

  it('Testa se a função update possui o comportamento esperado', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDb]);

    const productObj = {
      name: 'Martelo de Thor',
    };

    const productId = '1';

    const responseModel = await productsModel.update(productObj, productId);

    expect(responseModel).to.be.an('object');
    expect(responseModel).to.be.deep.equal({
      id: 1,
      name: 'Martelo de Thor',
    });
  });

  it('Testa se a função deleteFrom possui o comportamento esperado', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDb]);

    const productId = '1';

    const responseModel = await productsModel.deleteFrom(productId);

    expect(responseModel).to.be.deep.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});