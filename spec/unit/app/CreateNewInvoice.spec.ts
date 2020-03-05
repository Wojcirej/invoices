class InvoiceInMemoryRepository {
  public readonly invoices;

  constructor() {
    this.invoices = [];
  }

  save(invoice: object): boolean {
    this.invoices.push(invoice);
    return true;
  }
}

import fs from "fs";
import { CreateNewInvoice } from "../../../app/services/CreateNewInvoice";
import { invoicePayload } from "../../support/mocks/payloadSamples";

describe("CreateNewInvoice", () => {
  describe(".call", () => {
    afterEach(() => {
      if (fs.existsSync("/tmp/invoice.json")) {
        fs.unlinkSync("/tmp/invoice.json");
      }
    });

    const invoiceData = invoicePayload;

    it("creates new Invoice", () => {
      const repository = new InvoiceInMemoryRepository();
      const invoiceCountBefore = repository.invoices.length;
      CreateNewInvoice.call(invoiceData, repository);
      const invoiceCountAfter = repository.invoices.length;
      expect(invoiceCountAfter).toEqual(invoiceCountBefore + 1);
    });
  });
});
