import { Product } from "../../../domain/Product";

describe("Product", () => {
  describe("#calculateGrossPrice", () => {
    it("returns netPrice with valueAddedTax taken into consideration", () => {
      const product = new Product({ netPrice: 10.0, valueAddedTax: 0.23 });
      expect(product.calculateGrossPrice()).toEqual(12.3);
    });
  });
});
