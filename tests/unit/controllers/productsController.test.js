const { expect } = require("chai");
const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require("../../../src/services");
const { products } = require("../mocks/productsMock");

describe("Testing the productsController", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("Should test the listProducts", async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, "getProducts")
      .resolves(products);
    
    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it("Should test the listProductById", async () => {
    const req = {};
    const res = {};

    req.params = { id: '1' };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getProductById")
      .resolves({ type: null, message: products[0] });
    
    await productsController.listProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it("Should test the listProductById when the error happens - PRODUCT_NOT_FOUND", async () => {
    const req = {};
    const res = {};

    req.params = { id: "99999" };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getProductById")
      .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

    await productsController.listProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: "Product not found",
    });
  });
  
  it("Should test the addProduct", async () => {
    const req = {};
    const res = {};

    req.body = { name: 'test' };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, "insertProduct")
      .resolves({ type: null , message: 4 });

    await productsController.addProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'test' });
  });
});