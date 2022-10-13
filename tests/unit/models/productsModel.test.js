const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models/');
const { products } = require('../mocks/productsMock');

describe('Testing the productsModel', function () {
  afterEach(() => {
    sinon.restore();
  });
  
  it('Should test the getProducts', async () => {
    sinon.stub(connection, "execute")
      .resolves([products]);
    
    const result = await productsModel.getProducts();
    expect(result).to.be.deep.equal(products);
  });

  it('Should test the getProductById', async function () {
    sinon.stub(connection, "execute")
      .resolves([[{ id: 1, name: "Martelo de Thor" }]]);
    
    const result = await productsModel.getProductById(1);
    expect(result).to.be.deep.equal(products[0]);
  });
});