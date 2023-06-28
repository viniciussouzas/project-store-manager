const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productFromServiceSuccessful, productFromModel, productsFromServiceSuccessful, productsFromModel, productFromServiceNotFound } = require('../mocks/products.mock');

describe('Realizando testes da camada products controller', function () {
  it('Retorna todos os produtos com sucesso, status 200', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(productsFromServiceSuccessful);

    const req = {
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Retorna o produto com sucesso, status 200', async function () {
    sinon.stub(productsService, 'getProductsById').resolves(productFromServiceSuccessful);

    const req = {
      params: { productId: 1 },
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.listProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Retorna not found / status 404, ao inserir um id inexistente', async function () {
    sinon.stub(productsService, 'getProductsById').resolves(productFromServiceNotFound);

    const req = {
      params: { productId: 99 },
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.listProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  afterEach(function () {
    sinon.restore();
  });
});