import { Invoice } from "../../domain/Invoices/Invoice";

export class NewInvoiceDto {
  public readonly id: string;
  public readonly status: string;
  public readonly message: string;

  constructor(invoice: Invoice) {
    this.id = invoice.id;
    this.status = invoice.getStatus();
    this.message = "New Invoice has been created successfully.";
  }
}
