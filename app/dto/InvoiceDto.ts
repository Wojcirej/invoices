import { Invoice } from "../../domain/Invoices/Invoice";

export class InvoiceDto {
  public readonly id: string;
  public readonly status: string;
  public readonly message: string;

  constructor(invoice: Invoice) {
    this.id = invoice.id;
    this.status = invoice.getStatus();
    this.message = `Invoice has been created successfully. Status: ${this.status}.`;
  }
}