import { Company } from "./Company";
import { Order } from "./Order";
import InvoiceStatuses from "./lib/InvoiceStatuses";
import { InvoiceConstructorParams } from "./lib/interfaces";

export class Invoice {
  public readonly id: string;
  public readonly invoiceNumber: string;
  public readonly issuedAt: Date;
  public readonly saleDate: Date;
  public readonly seller: Company;
  public readonly buyer: Company;
  public readonly order: Order;
  public status: InvoiceStatuses;

  constructor(invoice: InvoiceConstructorParams) {
    this.id = invoice.invoiceDetails.id;
    this.invoiceNumber = invoice.invoiceDetails.invoiceNumber;
    this.issuedAt = invoice.invoiceDetails.issuedAt;
    this.saleDate = invoice.invoiceDetails.saleDate;
    this.status = invoice.invoiceDetails.status;
    this.seller = invoice.seller;
    this.buyer = invoice.buyer;
    this.order = invoice.order;
  }

  canBeEdited(): boolean {
    return this.status === InvoiceStatuses.New;
  }

  getStatus(): string {
    const map = Invoice.statusesMap();
    return map.get(this.status);
  }

  private static statusesMap(): Map<number, string> {
    return new Map<number, string>([
      [InvoiceStatuses.New, "New"],
      [InvoiceStatuses.Verified, "Verified"],
      [InvoiceStatuses.Settled, "Settled"]
    ]);
  }
}
