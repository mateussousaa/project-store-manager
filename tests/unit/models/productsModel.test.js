const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
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

  it("Should test the insertProduct", async function () {
    sinon
      .stub(connection, "execute")
      .resolves([{ insertId: 42 }]);

    const result = await productsModel.insertProduct({ name: 'test' });
    expect(result).to.be.deep.equal(42);
  });

  it("Should test the updateProduct", async function () {
    sinon
      .stub(connection, "execute")
      .resolves([{ affectedRows: 1 }]);

    const affectedRows = await productsModel.updateProduct({ name: "test", id: '1' });
    expect(affectedRows).to.be.equal(1);
  });
});