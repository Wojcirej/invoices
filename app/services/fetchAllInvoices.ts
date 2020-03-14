import { InvoiceDto } from "../dto/InvoiceDto";

export const fetchAllInvoices = (invoiceRepository): Array<InvoiceDto> => {
  const invoices = invoiceRepository.findAll();
  return invoices.map(invoice => new InvoiceDto(invoice));
};
