import { Order } from "./../../../domain/Order";
import { OrderRow } from "../../../domain/OrderRow";
import { Product } from "../../../domain/Product";

describe("Order", () => {
  describe("#calculatePrice", () => {
    it("returns sum price of the whole order", () => {
      const order = new Order([
        new OrderRow({ product: new Product({ netPrice: 10.0, valueAddedTax: 0.23 }), quantity: 5 }),
        new OrderRow({ product: new Product({ netPrice: 5.0, valueAddedTax: 0.07 }), quantity: 10 })
      ]);
      expect(order.calculatePrice()).toEqual(115);
    });
  });
});
