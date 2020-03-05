import { Order } from "../Order";
import { OrderRowFactory } from "./OrderRowFactory";
import { ProductFactory } from "./ProductFactory";

export class OrderFactory {
  private readonly order;

  constructor(data) {
    this.order = data;
  }

  static build(data): Order {
    return new OrderFactory(data).build();
  }

  build(): Order {
    const mapped = this.order.map((orderRow, index: number) =>
      OrderRowFactory.build({
        product: ProductFactory.build({
          name: orderRow.product.name,
          netPrice: orderRow.product.netPrice,
          valueAddedTax: orderRow.product.valueAddedTax,
          position: orderRow.product.position || index + 1
        }),
        quantity: orderRow.quantity
      })
    );
    return new Order(mapped);
  }
}
