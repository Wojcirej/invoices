import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { EditInvoice } from "../../../app/services/EditInvoice";
import { InvoiceDto } from "../../../app/dto/InvoiceDto";
import { InvoiceFactory } from "../../../domain/Invoices/factories/InvoiceFactory";
import { invoicePayload } from "../../support/mocks/payloadSamples";
import InvoiceStatuses from "../../../domain/Invoices/lib/InvoiceStatuses";

describe("EditInvoice", () => {
  const repository = new InvoiceRepository();

  describe("when Invoice with requested ID does not exist", () => {
    const invoiceId = "0";

    it("throws InvoiceNotFoundError", () => {
      try {
        EditInvoice.call(invoiceId, {}, repository);
      } catch (error) {
        expect(error.name).toEqual("InvoiceNotFoundError");
        expect(error.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
      }
    });
  });

  describe("when Invoice with requested ID exists", () => {
    describe("when Invoice cannot be edited", () => {
      const data = Object.assign({}, invoicePayload);
      data.invoice.status = InvoiceStatuses.Verified;
      const invoice = InvoiceFactory.buildInDb(data, repository);

      it("throws CannotEditInvoiceError", () => {
        try {
          EditInvoice.call(invoice.id, {}, repository);
        } catch (error) {
          expect(error.name).toEqual("CannotEditInvoiceError");
          expect(error.message).toEqual(
            `Invoice with ID ${invoice.id} cannot be edited - it's already Verified and only new Invoices can be edited.`
          );
        }
      });
    });

    describe("when Invoice can be edited", () => {
      const data = Object.assign({}, invoicePayload);
      data.invoice.status = InvoiceStatuses.New;
      const invoice = InvoiceFactory.buildInDb(data, repository);
      let result;

      beforeAll(() => {
        result = EditInvoice.call(invoice.id, {}, repository);
      });

      it("returns InvoiceDto instance", () => {
        expect(result).toBeInstanceOf(InvoiceDto);
      });

      it("returns InvoiceDto instance with ID as in params", () => {
        expect(result.id).toEqual(invoice.id);
      });
    });
  });
});
