import { Company } from "./Company";
import { Order } from "./Order";
import InvoiceStatuses from "./lib/InvoiceStatuses";
import { InvoiceConstructorParams } from "./lib/interfaces";

export class Invoice {
  public readonly invoiceNumber: string;
  public readonly issuedAt: Date;
  public readonly saleDate: Date;
  public readonly seller: Company;
  public readonly buyer: Company;
  public readonly order: Order;
  public readonly status: InvoiceStatuses;

  constructor(invoice: InvoiceConstructorParams) {
    this.invoiceNumber = invoice.invoiceDetails.invoiceNumber;
    this.issuedAt = invoice.invoiceDetails.issuedAt;
    this.saleDate = invoice.invoiceDetails.saleDate;
    this.status = invoice.invoiceDetails.status;
    this.seller = invoice.seller;
    this.buyer = invoice.buyer;
    this.order = invoice.order;
  }
}
