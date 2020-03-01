export class CreateNewInvoice {
  private readonly data;
  private readonly invoiceRepository;

  constructor(data, invoiceRepository) {
    this.data = data;
    this.invoiceRepository = invoiceRepository;
  }

  static call(data, invoiceRepository): object {
    return new CreateNewInvoice(data, invoiceRepository).call();
  }

  call(): object {
    this.invoiceRepository.save(this.data);
    return {
      invoice: {
        invoiceNumber: "123-45-67-891",
        issuedAt: this.data.invoice.issuedAt,
        saleDate: this.data.invoice.saleDate,
        status: "New",
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        order: this.data.order,
        seller: this.data.seller,
        buyer: this.data.buyer
      }
    };
  }
}
