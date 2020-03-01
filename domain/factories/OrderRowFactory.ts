import { OrderRowConstructorParams } from "../lib/interfaces";
import { ProductFactory } from "./ProductFactory";
import { Product } from "../Product";
import { OrderRow } from "../OrderRow";

export class OrderRowFactory {
  private readonly product: Product;
  private readonly quantity: number;

  constructor(data: OrderRowConstructorParams) {
    this.product = data.product || ProductFactory.build({
      name: null,
      position: null,
      netPrice: null,
      valueAddedTax: null
    });
    this.quantity = data.quantity || 1;
  }

  static build(data: OrderRowConstructorParams): OrderRow {
    return new OrderRowFactory(data).build();
  }

  build(): OrderRow {
    return new OrderRow({ product: this.product, quantity: this.quantity });
  }
}
