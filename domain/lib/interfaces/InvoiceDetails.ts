import InvoiceStatuses from "../InvoiceStatuses";

export interface InvoiceDetails {
  invoiceNumber: string;
  issuedAt: Date;
  saleDate: Date;
  status: InvoiceStatuses;
}
