import { Product } from "./Product";
import { OrderRowConstructorParams } from "./lib/interfaces";

export class OrderRow {
  private product: Product;
  private readonly quantity: number;

  constructor(orderRowDetails: OrderRowConstructorParams) {
    this.product = orderRowDetails.product;
    this.quantity = orderRowDetails.quantity;
  }

  calculatePrice(): number {
    return this.product.calculateGrossPrice() * this.quantity;
  }
}
