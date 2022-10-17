const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { sales, sale } = require('../mocks/salesMock');

describe('Testing the salesModel', function () {
  afterEach(() => {
    sinon.restore();
  });
  
  it('Should test the getSales', async () => {
    sinon.stub(connection, "execute")
      .resolves([sales]);
    
    const result = await salesModel.getSales();
    expect(result).to.be.deep.equal(sales);
  });

  it("Should test the getSaleById", async () => {
    sinon.stub(connection, "execute")
      .resolves([sale]);

    const result = await salesModel.getSaleById(2);
    expect(result).to.be.deep.equal(sale);
  });

  it("Should test the deleteSale", async () => {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await salesModel.deleteSale(1);
    expect(result).to.be.deep.equal(1);
  });
});