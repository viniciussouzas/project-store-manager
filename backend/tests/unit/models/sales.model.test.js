const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDB, saleFromDb } = require('../mocks/sales.mock');

describe('Realizando testes da camada sales model', function () {
  it('Testa se a função findAll possui o comportamento esperado', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    
    const responseModel = await salesModel.findAll();

    expect(responseModel).to.be.an('array');
    expect(responseModel).to.be.deep.equal(salesFromDB);
  });

  it('Testa se a função findById possui o comportamento esperado', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDb]);
    
    const saleId = 1;
    const responseModel = await salesModel.findById(saleId);

    expect(responseModel).to.be.an('array');
    expect(responseModel).to.be.deep.equal(saleFromDb);
  });

  afterEach(function () {
    sinon.restore();
  });
});