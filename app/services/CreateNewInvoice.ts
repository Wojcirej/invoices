import { Invoice } from "../../domain/Invoices/Invoice";
import { InvoiceFactory } from "../../domain/Invoices/factories/InvoiceFactory";
import { NewInvoiceDto } from "../dto/NewInvoiceDto";

export class CreateNewInvoice {
  private readonly invoice: Invoice;
  private readonly invoiceRepository;

  constructor(data, invoiceRepository) {
    this.invoice = InvoiceFactory.build(data);
    this.invoiceRepository = invoiceRepository;
  }

  static call(data, invoiceRepository): NewInvoiceDto {
    return new CreateNewInvoice(data, invoiceRepository).call();
  }

  call(): NewInvoiceDto {
    const invoiceSaveSuccess = this.invoiceRepository.save(this.invoice);
    if (invoiceSaveSuccess) {
      return new NewInvoiceDto(this.invoice);
    }
  }
}
