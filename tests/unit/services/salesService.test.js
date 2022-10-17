const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const { sales } = require("../mocks/salesMock");

describe("Testing the salesService", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("Should test the getSales", async () => {
    sinon.stub(salesModel, "getSales").resolves(sales);

    const result = await salesService.getSales();
    expect(result).to.be.deep.equal(sales);
    expect(result).to.be.be.an("array");
  });

  it("Should test the getSaleById", async function () {
    sinon.stub(salesModel, "getSaleById").resolves([sales[2]]);

    const result = await salesService.getSaleById(2);
    expect(result).to.be.deep.equal({ type: null, message: [sales[2]] });
  });

  it("Should test the getSaleById when Id doesn't exists", async function () {
    sinon.stub(salesModel, "getSaleById").resolves([]);

    const result = await salesService.getSaleById(7);
    expect(result).to.be.deep.equal({
      type: "SALE_NOT_FOUND",
      message: "Sale not found",
    });
  });

  it("Should test the deleteSale", async function () {
    sinon.stub(salesModel, "deleteSale").resolves(2);

    const result = await salesService.deleteSale(1);
    expect(result).to.be.deep.equal({ type: null, message: 1 });
  });
});
