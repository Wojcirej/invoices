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

  static buildInDb(data, repository): Invoice {
    return new InvoiceFactory(data).buildInDb(repository);
  }

  build(): Invoice {
    const invoiceDetails = {
      id: this.invoice.id || uuid(),
      invoiceNumber: this.invoice.invoiceNumber,
      issuedAt: new Date(this.invoice.issuedAt),
      saleDate: new Date(this.invoice.saleDate),
      status: this.invoice.status || InvoiceStatuses.New
    };
    const seller = CompanyFactory.build(this.invoice.seller || {});
    const buyer = CompanyFactory.build(this.invoice.buyer || {});
    const order = OrderFactory.build(this.invoice.order.orderRows);
    return new Invoice({
      invoiceDetails,
      buyer,
      seller,
      order
    });
  }

  buildInDb(repository): Invoice {
    const invoice = this.build();
    repository.save(invoice);
    return invoice;
  }
}
