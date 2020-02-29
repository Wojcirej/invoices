import { Company } from "./Company";
import { Order } from "./Order";
import InvoiceStatuses from "./lib/InvoiceStatuses";

export class Invoice {
  private invoiceNumber: string;
  private issuedAt: Date;
  private saleDate: Date;
  private seller: Company;
  private buyer: Company;
  private order: Order;
  private status: InvoiceStatuses;
  constructor(invoiceDetails, seller, buyer, order) {
    this.invoiceNumber = invoiceDetails.invoiceNumber;
    this.issuedAt = invoiceDetails.issuedAt;
    this.saleDate = invoiceDetails.saleDate;
    this.seller = seller;
    this.buyer = buyer;
    this.order = order;
    this.status = invoiceDetails.status;
  }
}
