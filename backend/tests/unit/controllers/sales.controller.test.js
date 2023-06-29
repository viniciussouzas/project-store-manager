const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { saleFromServiceSuccessful, saleFromModel, salesFromServiceSuccessful, salesFromModel, salesFromServiceNotFound } = require('../mocks/sales.mock');

describe('Realizando testes da camada sales controller', function () {
  it('Retorna todos as sales com sucesso, status 200', async function () {
    sinon.stub(salesService, 'getAllSales').resolves(salesFromServiceSuccessful);

    const req = {
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Retorna a sale com sucesso, status 200', async function () {
    sinon.stub(salesService, 'getSalesById').resolves(saleFromServiceSuccessful);

    const req = {
      params: { saleId: 1 },
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.listSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Retorna not found / status 404, ao inserir um id inexistente', async function () {
    sinon.stub(salesService, 'getSalesById').resolves(salesFromServiceNotFound);

    const req = {
      params: { saleId: 99 },
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.listSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesFromServiceNotFound.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});