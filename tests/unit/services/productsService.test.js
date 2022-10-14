const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const { products } = require("../mocks/productsMock");

describe("Testing the productsService", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("Should test the getProducts", async () => {
    sinon.stub(productsModel, "getProducts").resolves(products);

    const result = await productsService.getProducts();
    expect(result).to.be.deep.equal(products);
    expect(result).to.be.be.an("array");
  });

  it("Should test the getProductById", async function () {
    sinon.stub(productsModel, "getProductById").resolves(products[2]);

    const result = await productsService.getProductById(3);
    expect(result).to.be.deep.equal({ type: null, message: products[2] });
  });

  it("Should test the getProductById when Id doesn't exists", async function () {
    sinon.stub(productsModel, "getProductById").resolves(undefined);

    const result = await productsService.getProductById(7);
    expect(result).to.be.deep.equal({
      type: "PRODUCT_NOT_FOUND",
      message: "Product not found",
    });
  });

  it("Should test the insertProduct", async function () {
    sinon.stub(productsModel, "insertProduct").resolves(42);

    const result = await productsService.insertProduct({ name: "testing" });
    expect(result).to.be.deep.equal({ type: null, message: 42 });
  });

  it("Should test the updateProduct", async function () {
    sinon.stub(productsModel, "updateProduct").resolves(1);

    const result = await productsService.updateProduct({
      id: 2,
      name: "testing",
    });
    expect(result).to.be.deep.equal({
      type: null,
      message: { id: 2, name: "testing" },
    });
  });
});
