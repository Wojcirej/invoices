import InvoiceStatuses from "../InvoiceStatuses";

export interface InvoiceDetails {
  id: string;
  invoiceNumber: string;
  issuedAt: Date;
  saleDate: Date;
  status: InvoiceStatuses;
}
