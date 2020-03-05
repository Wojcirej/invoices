import fs from "fs";
import path from "path";

import { InvoiceRepository } from "../../../domain/repositories/InvoiceRepository";
import { InvoiceFactory } from "../../../domain/factories/InvoiceFactory";
import { invoicePayload } from "../../support/mocks/payloadSamples";

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
});
