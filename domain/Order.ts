import { OrderRow } from "./OrderRow";

export class Order {
  private orderRows: OrderRow[];
  constructor(orderRows: OrderRow[]) {
    this.orderRows = orderRows;
  }

  calculatePrice(): number {
    return this.orderRows.reduce((previousValue, currentValue) => previousValue + currentValue.calculatePrice(), 0);
  }
}
