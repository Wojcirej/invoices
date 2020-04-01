import { InvoiceDto } from "../dto/InvoiceDto";

export class GetInvoice {
  public readonly invoiceId: string;
  private readonly invoiceRepository;

  constructor(invoiceId, invoiceRepository) {
    this.invoiceId = invoiceId;
    this.invoiceRepository = invoiceRepository;
  }

  static call(invoiceId, invoiceRepository): InvoiceDto {
    return new GetInvoice(invoiceId, invoiceRepository).call();
  }

  call(): InvoiceDto {
    return new InvoiceDto(this.invoiceRepository.find(this.invoiceId));
  }
}
