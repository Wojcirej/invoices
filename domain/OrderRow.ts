import { Product } from "./Product";

export class OrderRow {
  private product: Product;
  private readonly quantity: number;
  constructor(orderRowDetails) {
    this.product = orderRowDetails.product;
    this.quantity = orderRowDetails.quantity;
  }

  calculatePrice(): number {
    return this.product.calculateGrossPrice() * this.quantity;
  }
}
