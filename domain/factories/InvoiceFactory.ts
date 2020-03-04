import { v4 as uuid } from "uuid";

import { Invoice } from "../Invoice";
import { CompanyFactory } from "./CompanyFactory";
import InvoiceStatuses from "../lib/InvoiceStatuses";
import { OrderFactory } from "./OrderFactory";

export class InvoiceFactory {
  private readonly invoice;

  constructor(data) {
    this.invoice = data.invoice;
  }

  static build(data): Invoice {
    return new InvoiceFactory(data).build();
  }

  build(): Invoice {
    const invoiceDetails = {
      id: uuid(),
      invoiceNumber: this.invoice.invoiceNumber,
      issuedAt: new Date(this.invoice.issuedAt),
      saleDate: new Date(this.invoice.saleDate),
      status: InvoiceStatuses.Added
    };
    const seller = CompanyFactory.build(this.invoice.seller);
    const buyer = CompanyFactory.build(this.invoice.buyer);
    const order = OrderFactory.build(this.invoice.order);
    return new Invoice({
      invoiceDetails,
      buyer,
      seller,
      order
    });
  }
}
