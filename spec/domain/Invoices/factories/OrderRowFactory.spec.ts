import { OrderRowFactory } from "../../../../domain/Invoices/factories/OrderRowFactory";
import { OrderRow } from "../../../../domain/Invoices/OrderRow";
import { Product } from "../../../../domain/Invoices/Product";
import { ProductFactory } from "../../../../domain/Invoices/factories/ProductFactory";

describe("OrderRowFactory", () => {
  describe(".build()", () => {
    describe("when no truthy values passed", () => {
      const data = { quantity: null, product: null };
      it("returns instance of OrderRow with quantity set to 1", () => {
        const orderRow = OrderRowFactory.build(data);
        expect(orderRow).toBeInstanceOf(OrderRow);
        expect(orderRow.quantity).toEqual(1);
      });
      it("returns instance of OrderRow with product being instance of Product", () => {
        const orderRow = OrderRowFactory.build(data);
        expect(orderRow.product).toBeInstanceOf(Product);
      });
    });

    describe("when any values under acceptable keys passed", () => {
      const data = {
        quantity: 5,
        product: ProductFactory.build({
          position: 1,
          name: "Random name",
          valueAddedTax: 0.23,
          netPrice: 10.0
        })
      };
      it("returns instance of OrderRow with quantity set as in params", () => {
        const orderRow = OrderRowFactory.build(data);
        expect(orderRow).toBeInstanceOf(OrderRow);
        expect(orderRow.quantity).toEqual(data.quantity);
      });
      it("returns instance of OrderRow with product being instance of Product", () => {
        const orderRow = OrderRowFactory.build(data);
        expect(orderRow.product).toBeInstanceOf(Product);
        expect(orderRow.product.position).toEqual(data.product.position);
        expect(orderRow.product.name).toEqual(data.product.name);
        expect(orderRow.product.valueAddedTax).toEqual(data.product.valueAddedTax);
        expect(orderRow.product.netPrice).toEqual(data.product.netPrice);
      });
    });
  });
});
