import fs from "fs";
import path from "path";

import { Invoice } from "../../../../domain/Invoices/Invoice";
import { InvoiceRepository } from "../../../../domain/Invoices/repositories/InvoiceRepository";
import { InvoiceFactory } from "../../../../domain/Invoices/factories/InvoiceFactory";
import { invoicePayload } from "../../../support/mocks/payloadSamples";

describe("InvoiceRepository", () => {
  const repository = new InvoiceRepository();
  describe("#save", () => {
    describe("when success", () => {
      const data = invoicePayload;
      const invoice = InvoiceFactory.build(data);

      it("returns true", () => {
        expect(repository.save(invoice)).toBe(true);
      });

      it("saves passed object as JSON file in specified directory", () => {
        repository.save(invoice);
        expect(fs.existsSync(path.join(process.cwd(), `/tmp/db/invoices/${invoice.id}.json`))).toBe(true);
      });
    });
  });

  describe("#findAll", () => {
    it("returns list of the Invoice objects", () => {
      const allInvoices = repository.findAll();
      expect(allInvoices.every(invoice => invoice instanceof Invoice)).toBe(true);
    });
  });

  describe("#find", () => {
    describe("when Invoice with provided ID exists", () => {
      const invoice = InvoiceFactory.buildInDb(invoicePayload, repository);
      const expectedInvoiceData = JSON.parse(fs.readFileSync(`${repository.path}/${invoice.id}.json`).toString());

      it("returns Invoice instance", () => {
        const foundInvoice = repository.find(invoice.id);
        expect(foundInvoice).toBeInstanceOf(Invoice);
      });

      it("returns Invoice instance with provided ID", () => {
        const foundInvoice = repository.find(invoice.id);
        expect(foundInvoice.id).toEqual(invoice.id);
      });

      it("returns Invoice instance with seller as Company instance with the same ID", () => {
        const foundInvoice = repository.find(invoice.id);
        const expectedSeller = expectedInvoiceData.seller;
        expect(foundInvoice.seller.id).toEqual(expectedSeller.id);
      });

      it("returns Invoice instance with buyer as Company instance with the same ID", () => {
        const foundInvoice = repository.find(invoice.id);
        const expectedBuyer = expectedInvoiceData.buyer;
        expect(foundInvoice.buyer.id).toEqual(expectedBuyer.id);
      });
    });

    describe("when Invoice with provided ID does not exist", () => {
      const invoiceId = "0";

      it("throws InvoiceNotFoundError", () => {
        try {
          repository.find(invoiceId);
        } catch (error) {
          expect(error.name).toEqual("InvoiceNotFoundError");
          expect(error.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
        }
      });
    });
  });
});
