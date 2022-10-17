const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { salesController } = require("../../../src/controllers");
const { salesService } = require("../../../src/services");
const { sales } = require("../mocks/salesMock");

describe("Testing the salesController", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("Should test the listSales", async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, "getSales").resolves(sales);

    await salesController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  it("Should test the listSaleById", async () => {
    const req = {};
    const res = {};

    req.params = { id: "1" };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, "getSaleById")
      .resolves({ type: null, message: [sales[0], sales[1]] });

    await salesController.listSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([sales[0], sales[1]]);
  });

  it("Should test the deleteSale", async () => {
    const req = {};
    const res = {};

    req.params = { id: "1" };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, "deleteSale")
      .resolves({ type: null, message: 1 });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
});