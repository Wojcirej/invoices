import { ProductFactory } from "../../../domain/Invoices/factories/ProductFactory";
import { Product } from "../../../domain/Invoices/Product";

describe("ProductFactory", () => {
  describe(".build()", () => {
    describe("when any values under acceptable keys passed", () => {
      const data = {
        position: 1,
        name: "Random name",
        valueAddedTax: 0.23,
        netPrice: 10.0
      };
      it("returns instance of Product with passed data", () => {
        const product = ProductFactory.build(data);
        expect(product).toBeInstanceOf(Product);
        expect(product.position).toEqual(data.position);
        expect(product.name).toEqual(data.name);
        expect(product.valueAddedTax).toEqual(data.valueAddedTax);
        expect(product.netPrice).toEqual(data.netPrice);
      });
    });
    describe("when no truthy values passed", () => {
      const data = {
        position: null,
        name: null,
        valueAddedTax: null,
        netPrice: null
      };
      it("returns instance of Product with randomly generated data", () => {
        const product = ProductFactory.build(data);
        expect(product).toBeInstanceOf(Product);
        expect(product.position).toEqual(1);
        expect(product.name).toBeTruthy("Product name is empty");
        expect(product.valueAddedTax).toBeTruthy("Product Value Added Tax is empty");
        expect(product.netPrice).toBeTruthy("Product net price is empty");
      });
    });
  });
});
