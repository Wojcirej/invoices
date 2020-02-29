import { Company } from "./Company";
import { Order } from "./Order";
import InvoiceStatuses from "./lib/InvoiceStatuses";
import { InvoiceConstructorParams } from "./lib/interfaces";

export class Invoice {
  private invoiceNumber: string;
  private issuedAt: Date;
  private saleDate: Date;
  private seller: Company;
  private buyer: Company;
  private order: Order;
  private status: InvoiceStatuses;

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
