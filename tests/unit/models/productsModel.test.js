const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models/');

const allProductsResponse = require('./mocks/productsMock');

describe('Testing the productModel', function () {
  afterEach(() => {
    sinon.restore();
  });
  
  it('Should test the getAllProducts', async () => {
    sinon.stub(connection, "execute").resolves([allProductsResponse]);
    const result = await productsModel.getProducts();
    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it('Should test the getProductsById', async function () {
    sinon.stub(connection, "execute").resolves([[{ id: 1, name: "Martelo de Thor" }]]);
    const result = await productsModel.getProductsById(1);
    expect(result).to.be.deep.equal(allProductsResponse[0]);
  });
});