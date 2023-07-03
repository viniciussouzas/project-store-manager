const { expect } = require('chai');
const sinon = require('sinon');
const joiSchema = require('../../../src/services/validations/validateSalesFields');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesFromModel, saleFromModel, saleInsertFromModel, salesFromServiceRequired } = require('../mocks/sales.mock');
const { productFromModel } = require('../mocks/products.mock');

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

  it('Testa se a função insertSale retorna o status e data esperados', async function () {
    sinon.stub(salesModel, 'insertInto').resolves(saleInsertFromModel);
    sinon.stub(productsModel, 'findById').resolves(productFromModel);

    const saleObj = [{
      productId: 3, 
      quantity: 15,
    }];

    const responseService = await salesService.insertSale(saleObj);

    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.be.deep.equal(saleInsertFromModel);
  });

  it('Testa se a função insertSale retorna o status e data esperados ao inserir produto inválido', async function () {
    sinon.stub(salesModel, 'insertInto').resolves(saleInsertFromModel);
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const saleObj = [{
      productId: 99, 
      quantity: 15,
    }];

    const responseService = await salesService.insertSale(saleObj);

    expect(responseService.status).to.equal('NOT_FOUND');
  });

  it('Testa se a função insertSale retorna o status e data esperados ao não inserir dados requeridos', async function () {
    sinon.stub(joiSchema, 'validateSalesFields').resolves(salesFromServiceRequired);
    sinon.stub(salesModel, 'insertInto').resolves(undefined);
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const saleObj = [{
      quantity: 15,
    }];

    const responseService = await salesService.insertSale(saleObj);

    expect(responseService.status).to.equal('REQUIRED_VALUE');
  });

  afterEach(function () {
    sinon.restore();
  });
});