const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productFromServiceSuccessful, productFromModel, productsFromServiceSuccessful, productsFromModel, productFromServiceNotFound, productFromServiceCreated, productFromServiceDeleted } = require('../mocks/products.mock');

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
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });

  it('Retorna CREATED / status 201, ao cadastrar um novo produto', async function () {
    sinon.stub(productsService, 'insertProduct').resolves(productFromServiceCreated);

    const req = {
      params: { },
      body: productFromModel,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productFromServiceCreated.data);
  });

  it('Retorna SUCCESSFUL / status 200, ao atualizar um produto', async function () {
    sinon.stub(productsService, 'updtProduct').resolves(productFromServiceSuccessful);

    const req = {
      params: { productId: 1 },
      body: {
        name: 'Martelo de Thor',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromServiceSuccessful.data);
  });

  it('Retorna NOT_FOUND / status 404, ao tentar atualizar um produto inválido', async function () {
    sinon.stub(productsService, 'updtProduct').resolves(productFromServiceNotFound);

    const req = {
      params: { productId: 99 },
      body: {
        name: 'Martelo de Thor',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });

  it('Retorna DELETED / status 204, ao deletar um produto', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves(productFromServiceDeleted);

    const req = {
      params: { productId: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.removeProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Retorna NOT_FOUND / status 404, ao tentar deletar um produto com id inválido', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves(productFromServiceNotFound);

    const req = {
      params: { productId: 99 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.removeProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});