import faker from "faker";

import { ProductConstructorParams } from "../lib/interfaces";
import { Product } from "../Product";

export class ProductFactory {
  public readonly position: number;
  public readonly name: string;
  public readonly netPrice: number;
  public readonly valueAddedTax: number;

  constructor(data: ProductConstructorParams) {
    this.position = data.position || 1;
    this.name = data.name || faker.name.title();
    this.netPrice = data.netPrice || faker.random.number({ precision: 2 });
    this.valueAddedTax = data.valueAddedTax || Number(Math.random().toPrecision(2));
  }

  static build(data: ProductConstructorParams): Product {
    return new ProductFactory(data).build();
  }

  build(): Product {
    return new Product({
      position: this.position,
      name: this.name,
      valueAddedTax: this.valueAddedTax,
      netPrice: this.netPrice
    });
  }
}
