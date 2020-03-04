import { Invoice } from "../Invoice";
import { CompanyFactory } from "./CompanyFactory";
import InvoiceStatuses from "../lib/InvoiceStatuses";
import { OrderRowFactory } from "./OrderRowFactory";
import { Order } from "../Order";

class InvoiceFactory {
  private readonly invoice;

  constructor(data) {
    this.invoice = data.invoice;
  }

  static build(data): Invoice {
    return new InvoiceFactory(data).build();
  }

  build(): Invoice {
    const invoiceDetails = {
      invoiceNumber: this.invoice.invoiceNumber,
      issuedAt: new Date(this.invoice.issuedAt),
      saleDate: new Date(this.invoice.saleDate),
      status: InvoiceStatuses.Added
    };
    const seller = CompanyFactory.build(this.invoice.seller);
    const buyer = CompanyFactory.build(this.invoice.buyer);
    const mappedOrderRows = this.invoice.order.map(orderRow =>
      OrderRowFactory.build({ product: orderRow.product, quantity: orderRow.quantity })
    );
    return new Invoice({
      invoiceDetails,
      buyer,
      seller,
      order: new Order(mappedOrderRows)
    });
  }
}

export { InvoiceFactory };
