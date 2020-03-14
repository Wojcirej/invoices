import { ProductFactory } from "../../../domain/Invoices/factories/ProductFactory";

describe("Product", () => {
  describe("#calculateGrossPrice", () => {
    it("returns netPrice with valueAddedTax taken into consideration", () => {
      const product = ProductFactory.build({ netPrice: 10.0, valueAddedTax: 0.23, position: 1, name: "Random" });
      expect(product.calculateGrossPrice()).toEqual(12.3);
    });
  });
});
