import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { GetInvoice } from "../../../app/services/GetInvoice";
import { InvoiceDto } from "../../../app/dto/InvoiceDto";
import { InvoiceFactory } from "../../../domain/Invoices/factories/InvoiceFactory";
import { invoicePayload } from "../../support/mocks/payloadSamples";

describe("GetInvoice", () => {
  describe(".call", () => {
    const repository = new InvoiceRepository();

    describe("when Invoice with provided ID exists", () => {
      const invoice = InvoiceFactory.buildInDb(invoicePayload, repository);
      let result;

      beforeAll(() => {
        result = GetInvoice.call(invoice.id, repository);
      });

      it("returns InvoiceDto instance", () => {
        expect(result).toBeInstanceOf(InvoiceDto);
      });

      it("returns InvoiceDto instance with requested Invoice id", () => {
        expect(result.id).toEqual(invoice.id);
      });

      it("returns InvoiceDto instance with Invoice number as in requested Invoice", () => {
        expect(result.invoiceNumber).toEqual(invoice.invoiceNumber);
      });

      it("returns InvoiceDto instance with status in human readable way", () => {
        expect(result.status).toBeInstanceOf(String);
        expect(result.status).toEqual(invoice.getStatus());
      });

      it("returns InvoiceDto instance with sale date represented as numerical timestamp", () => {
        expect(result.saleDate).toBeInstanceOf(Number);
        expect(result.saleDate).toEqual(new Date(invoice.saleDate).getTime());
      });

      it("returns InvoiceDto instance with issue date represented as numerical timestamp", () => {
        expect(result.issuedAt).toBeInstanceOf(Number);
        expect(result.issuedAt).toEqual(new Date(invoice.issuedAt).getTime());
      });
    });

    describe("when Invoice with provided ID does not exist", () => {
      const invoiceId = "0";

      it("throws InvoiceNotFoundError", () => {
        try {
          GetInvoice.call(invoiceId, repository);
        } catch (error) {
          expect(error.name).toEqual("InvoiceNotFoundError");
          expect(error.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
        }
      });
    });
  });
});
