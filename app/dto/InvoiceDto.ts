import { Invoice } from "../../domain/Invoices/Invoice";

export class InvoiceDto {
  private readonly invoice: Invoice;
  public readonly id: string;
  public readonly invoiceNumber: string;
  public readonly status: string;
  public readonly issuedAt: number;
  public readonly saleDate: number;

  constructor(invoice: Invoice) {
    this.invoice = invoice;
    this.id = invoice.id;
    this.invoiceNumber = invoice.invoiceNumber;
    this.status = invoice.getStatus();
    this.issuedAt = new Date(invoice.issuedAt).getTime();
    this.saleDate = new Date(invoice.saleDate).getTime();
  }
}
