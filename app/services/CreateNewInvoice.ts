import { Invoice } from "../../domain/Invoices/Invoice";
import { InvoiceFactory } from "../../domain/Invoices/factories/InvoiceFactory";
import { InvoiceDto } from "../dto/InvoiceDto";

export class CreateNewInvoice {
  private readonly invoice: Invoice;
  private readonly invoiceRepository;

  constructor(data, invoiceRepository) {
    this.invoice = InvoiceFactory.build(data);
    this.invoiceRepository = invoiceRepository;
  }

  static call(data, invoiceRepository): InvoiceDto {
    return new CreateNewInvoice(data, invoiceRepository).call();
  }

  call(): InvoiceDto {
    const invoiceSaveSuccess = this.invoiceRepository.save(this.invoice);
    if (invoiceSaveSuccess) {
      return new InvoiceDto(this.invoice);
    }
  }
}
