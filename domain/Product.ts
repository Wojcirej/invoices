import { ProductConstructorParams } from "./lib/interfaces";

export class Product {
  public readonly position: number;
  public readonly name: string;
  public readonly netPrice: number;
  public readonly valueAddedTax: number;

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
