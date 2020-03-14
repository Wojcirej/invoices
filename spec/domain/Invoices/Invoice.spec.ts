import { InvoiceFactory } from "../../../domain/Invoices/factories/InvoiceFactory";
import InvoiceStatuses from "../../../domain/Invoices/lib/InvoiceStatuses";

describe("Invoice", () => {
  describe("#canBeEdited()", () => {
    describe("when Invoice is new", () => {
      const invoice = InvoiceFactory.build({ invoice: { status: InvoiceStatuses.New, order: { orderRows: [] } } });

      it("returns true", () => {
        expect(invoice.canBeEdited()).toBe(true);
      });
    });

    describe("when Invoice is verified", () => {
      const invoice = InvoiceFactory.build({ invoice: { status: InvoiceStatuses.Verified, order: { orderRows: [] } } });

      it("returns false", () => {
        expect(invoice.canBeEdited()).toBe(false);
      });
    });

    describe("when Invoice is settled", () => {
      const invoice = InvoiceFactory.build({ invoice: { status: InvoiceStatuses.Settled, order: { orderRows: [] } } });

      it("returns false", () => {
        expect(invoice.canBeEdited()).toBe(false);
      });
    });
  });
});
