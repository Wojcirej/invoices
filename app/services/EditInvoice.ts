import { InvoiceDto } from "../dto/InvoiceDto";
import { CannotEditInvoiceError } from "../../domain/Invoices/errors/CannotEditInvoiceError";

export class EditInvoice {
  private readonly invoiceId: string;
  private readonly data;
  private readonly invoiceRepository;

  constructor(invoiceId, data, invoiceRepository) {
    this.invoiceId = invoiceId;
    this.data = data;
    this.invoiceRepository = invoiceRepository;
  }

  static call(invoiceId, data, invoiceRepository): InvoiceDto {
    return new EditInvoice(invoiceId, data, invoiceRepository).call();
  }

  call(): InvoiceDto {
    const invoice = this.invoiceRepository.find(this.invoiceId);
    if (!invoice.canBeEdited()) {
      throw new CannotEditInvoiceError(
        `Invoice with ID ${
          this.invoiceId
        } cannot be edited - it's already ${invoice.getStatus()} and only new Invoices can be edited.`
      );
    }
    return new InvoiceDto(invoice);
  }
}
