import { OrderRow } from "../../../domain/OrderRow";
import { Product } from "../../../domain/Product";

describe("OrderRow", () => {
  describe("#calculatePrice", () => {
    it("returns gross price of the product multiplied by quantity", () => {
      const orderRow = new OrderRow({
        product: new Product({
          netPrice: 10.0,
          valueAddedTax: 0.23,
          name: "Random",
          position: 1
        }), quantity: 5
      });
      expect(orderRow.calculatePrice()).toEqual(61.5);
    });
  });
});
