import { OrderFactory } from "../../../domain/factories/OrderFactory";
import { Order } from "../../../domain/Order";
import { Product } from "../../../domain/Product";
import { orderPayload } from "../../support/mocks/payloadSamples";

describe("OrderFactory", () => {
  describe(".build", () => {
    describe("when data provided", () => {
      const data = orderPayload;

      it("returns Order instance", () => {
        const order = OrderFactory.build(data);
        expect(order).toBeInstanceOf(Order);
      });

      it("returns Order instance with as much order rows as in params", () => {
        const order = OrderFactory.build(data);
        expect(order.orderRows.length).toEqual(data.length);
      });

      it("returns Order instance with order rows aggregating Product instances", () => {
        const order = OrderFactory.build(data);
        order.orderRows.forEach(orderRow => {
          expect(orderRow.product).toBeInstanceOf(Product);
        });
      });

      it("returns Order instance with order details as in params", () => {
        const order = OrderFactory.build(data);
        order.orderRows.forEach((orderRow, index) => {
          expect(orderRow.quantity).toEqual(data[index].quantity, `Quantity of order ${index} does not match.`);
          expect(orderRow.product.name).toEqual(
            data[index].product.name,
            `Name of the product ${index} does not match.`
          );
          expect(orderRow.product.netPrice).toEqual(
            data[index].product.netPrice,
            `Net price of the product ${index} does not match.`
          );
          expect(orderRow.product.valueAddedTax).toEqual(
            data[index].product.valueAddedTax,
            `Value added tax of the product ${index} does not match.`
          );
        });
      });

      describe("when position within products is present", () => {
        it("sets position for products as provided", () => {
          const order = OrderFactory.build(data);
          const expectedProductPositions = [1, 2];
          const receivedProductPositions = order.orderRows.map(orderRow => orderRow.product.position);
          expect(expectedProductPositions).toEqual(receivedProductPositions);
        });
      });

      describe("when position within product is missing", () => {
        const data = orderPayload;
        data.forEach(orderRow => delete orderRow.product.position);

        it("ensures unique position of products across whole order", () => {
          const order = OrderFactory.build(data);
          expect(order.orderRows.map(orderRow => orderRow.product.position)).toEqual([1, 2]);
        });
      });
    });
  });
});
