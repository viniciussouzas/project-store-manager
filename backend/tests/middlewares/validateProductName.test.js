const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateProductName = require('../../src/middlewares/validateProductName');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes dos middlewares', function () {
  it('Testa se o next é chamado, ao inserir name válido', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: { 
        name: 'Martelo do Thor',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateProductName(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Testa se o middleware possui o comportamento esperado, ao não inserir name', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: { },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateProductName(req, res, next);

    expect(next).not.to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Testa se o middleware possui o comportamento esperado, ao inserir name com menos de 5 caracteres', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: { 
        name: 'Mar',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateProductName(req, res, next);

    expect(next).not.to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});