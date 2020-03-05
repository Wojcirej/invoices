import { Order } from "../../../domain/Invoices/Order";
import { OrderRow } from "../../../domain/Invoices/OrderRow";
import { Product } from "../../../domain/Invoices/Product";

describe("Order", () => {
  describe("#calculatePrice", () => {
    it("returns sum price of the whole order", () => {
      const order = new Order([
        new OrderRow({
          product: new Product({ netPrice: 10.0, valueAddedTax: 0.23, name: "Random", position: 1 }),
          quantity: 5
        }),
        new OrderRow({
          product: new Product({ netPrice: 5.0, valueAddedTax: 0.07, name: "Random", position: 2 }),
          quantity: 10
        })
      ]);
      expect(order.calculatePrice()).toEqual(115);
    });
  });
});
