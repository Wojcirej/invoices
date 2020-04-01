import { Invoice } from "../../../domain/Invoices/Invoice";
import { CreateNewInvoice } from "../../../app/services/CreateNewInvoice";
import { invoicePayload } from "../../support/mocks/payloadSamples";
import { NewInvoiceDto } from "../../../app/dto/NewInvoiceDto";

class InvoiceInMemoryRepository {
  public readonly invoices;

  constructor() {
    this.invoices = [];
  }

  save(invoice: Invoice): boolean {
    this.invoices.push(invoice);
    return true;
  }
}

describe("CreateNewInvoice", () => {
  describe(".call", () => {
    const invoiceData = invoicePayload;
    const repository = new InvoiceInMemoryRepository();

    it("creates new Invoice", () => {
      const invoiceCountBefore = repository.invoices.length;
      CreateNewInvoice.call(invoiceData, repository);
      const invoiceCountAfter = repository.invoices.length;
      expect(invoiceCountAfter).toEqual(invoiceCountBefore + 1);
    });

    it("returns instance of NewInvoiceDto", () => {
      const createNewInvoiceResult = CreateNewInvoice.call(invoiceData, repository);
      expect(createNewInvoiceResult).toBeInstanceOf(NewInvoiceDto);
    });

    it("returns NewInvoiceDto containing ID of the newly created Invoice", () => {
      const createNewInvoiceResult = CreateNewInvoice.call(invoiceData, repository);
      expect(createNewInvoiceResult.id).toBeTruthy("Invoice ID after create is empty.");
    });

    it("returns NewInvoiceDto containing status of the Invoice", () => {
      const createNewInvoiceResult = CreateNewInvoice.call(invoiceData, repository);
      expect(createNewInvoiceResult.status).toEqual("New");
    });
  });
});
