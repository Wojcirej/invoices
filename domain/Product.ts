import { ProductConstructorParams } from "./lib/interfaces";

export class Product {
  private position: number;
  private name: string;
  private readonly netPrice: number;
  private readonly valueAddedTax: number;

  constructor(productDetails: ProductConstructorParams) {
    this.position = productDetails.position;
    this.name = productDetails.name;
    this.netPrice = productDetails.netPrice;
    this.valueAddedTax = productDetails.valueAddedTax;
  }

  calculateGrossPrice(): number {
    return this.netPrice + this.netPrice * this.valueAddedTax;
  }
}
