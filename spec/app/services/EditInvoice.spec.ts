import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { EditInvoice } from "../../../app/services/EditInvoice";
import { InvoiceDto } from "../../../app/dto/InvoiceDto";

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
      const invoiceId = "0c618531-7101-40cf-9218-5dbee6fdfd93";

      it("throws CannotEditInvoiceError", () => {
        try {
          EditInvoice.call(invoiceId, {}, repository);
        } catch (error) {
          expect(error.name).toEqual("CannotEditInvoiceError");
          expect(error.message).toEqual(
            `Invoice with ID ${invoiceId} cannot be edited - it's already Verified and only new Invoices can be edited.`
          );
        }
      });
    });

    describe("when Invoice can be edited", () => {
      const invoiceId = "0a0c0a14-c537-44bb-9716-5e181a47d977";
      let result;

      beforeAll(() => {
        result = EditInvoice.call(invoiceId, {}, repository);
      });

      it("returns InvoiceDto instance", () => {
        expect(result).toBeInstanceOf(InvoiceDto);
      });

      it("returns InvoiceDto instance with ID as in params", () => {
        expect(result.id).toEqual(invoiceId);
      });
    });
  });
});
