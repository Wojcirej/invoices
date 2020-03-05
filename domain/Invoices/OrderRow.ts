import { Product } from "./Product";
import { OrderRowConstructorParams } from "./lib/interfaces";

export class OrderRow {
  public readonly product: Product;
  public readonly quantity: number;

  constructor(orderRowDetails: OrderRowConstructorParams) {
    this.product = orderRowDetails.product;
    this.quantity = orderRowDetails.quantity;
  }

  calculatePrice(): number {
    return this.product.calculateGrossPrice() * this.quantity;
  }
}
