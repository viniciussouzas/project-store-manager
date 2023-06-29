const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesFromModel, saleFromModel } = require('../mocks/sales.mock');

describe('Realizando testes da camada sales service', function () {
  it('Testa se a função getAllSales retorna o status e data esperados', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

    const responseService = await salesService.getAllSales();

    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(salesFromModel);
  });

  it('Testa se a função getSalesById retorna o status e data esperados ao inserir id existente', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);

    const saleId = 1;
    const responseService = await salesService.getSalesById(saleId);

    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(saleFromModel);
  });

  it('Testa se a função getSalesById retorna o status e data esperados ao inserir id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves(undefined);

    const saleId = 99;
    const responseService = await salesService.getSalesById(saleId);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data.message).to.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});