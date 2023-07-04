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

  it('Testa se a função insertProduct retorna o status e data esperados', async function () {
    sinon.stub(productsModel, 'insertInto').resolves(productFromModel);

    const productObj = {
      name: 'Martelo de Thor',
    };

    const responseService = await productsService.insertProduct(productObj);

    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.be.deep.equal(productFromModel);
  });

  it('Testa se a função updtProduct retorna o status e data esperados', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    sinon.stub(productsModel, 'update').resolves(productFromModel);

    const productObj = {
      name: 'Martelo de Thor',
    };

    const productId = '1';

    const responseService = await productsService.updtProduct(productObj, productId);

    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.be.deep.equal(productFromModel);
  });

  it('Testa se a função updtProduct retorna o status e data esperados ao inserir id de produto inválido', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    sinon.stub(productsModel, 'update').resolves(productFromModel);

    const productObj = {
      name: 'Martelo de Thor',
    };

    const productId = '99';

    const responseService = await productsService.updtProduct(productObj, productId);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});