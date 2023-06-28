const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsFromModel, productFromModel } = require('../mocks/products.mock');

describe('Realizando testes da camada products service', function () {
  it('Testa se a função getAllProducts retorna o status e data esperados', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

    const responseService = await productsService.getAllProducts();

    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productsFromModel);
  });

  it('Testa se a função getProductsById retorna o status e data esperados ao inserir id existente', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);

    const productId = 1;
    const responseService = await productsService.getProductsById(productId);

    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productFromModel);
  });

  it('Testa se a função getProductsById retorna o status e data esperados ao inserir id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const productId = 99;
    const responseService = await productsService.getProductsById(productId);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data.message).to.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});