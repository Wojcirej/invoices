import fs from "fs";

import { InvoiceRepository } from "../../../domain/repositories/InvoiceRepository";

describe("InvoiceRepository", () => {
  const repository = new InvoiceRepository();
  describe("#save", () => {
    describe("when success", () => {
      afterEach(() => {
        if (fs.existsSync("/tmp/invoice.json")) {
          fs.unlinkSync("/tmp/invoice.json");
        }
      });
      it("returns true", () => {
        expect(repository.save({})).toBe(true);
      });
      it("saves passed object as JSON file in specified directory", () => {
        repository.save({});
        expect(fs.existsSync("/tmp/invoice.json")).toBe(true);
      });
    });
  });
});
