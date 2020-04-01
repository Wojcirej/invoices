import { fetchAllInvoices } from "../../../app/services/fetchAllInvoices";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { InvoiceDto } from "../../../app/dto/InvoiceDto";

describe("fetchAllInvoices", () => {
  const repository = new InvoiceRepository();

  it("returns list of InvoiceDto", () => {
    const list = fetchAllInvoices(repository);
    list.forEach(item => {
      expect(item).toBeInstanceOf(InvoiceDto);
    });
  });
});
