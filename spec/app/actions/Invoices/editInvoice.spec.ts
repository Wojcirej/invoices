import httpMocks from "node-mocks-http";
import { editInvoice } from "../../../../app/actions/Invoices/editInvoice";
import { InvoiceFactory } from "../../../../domain/Invoices/factories/InvoiceFactory";
import { invoicePayload } from "../../../support/mocks/payloadSamples";
import { InvoiceRepository } from "../../../../domain/Invoices/repositories/InvoiceRepository";
import InvoiceStatuses from "../../../../domain/Invoices/lib/InvoiceStatuses";

describe("editInvoice", () => {
  describe("when Invoice with provided ID does not exist", () => {
    const invoiceId = "0";
    const mockRequest = httpMocks.createRequest({
      method: "PATCH",
      url: "/invoices/:id",
      params: { id: invoiceId }
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await editInvoice(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns message about Invoice not found", () => {
      expect(actualResponseBody.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
    });
  });

  describe("when Invoice with provided ID exists", () => {
    describe("when Invoice cannot be edited", () => {
      const data = Object.assign({}, invoicePayload);
      data.invoice.status = InvoiceStatuses.Verified;
      const invoice = InvoiceFactory.buildInDb(data, new InvoiceRepository());
      const mockRequest = httpMocks.createRequest({
        method: "PATCH",
        url: "/invoices/:id",
        params: { id: invoice.id }
      });
      const mockResponse = httpMocks.createResponse();
      let actualResponseBody;

      beforeAll(async () => {
        await editInvoice(mockRequest, mockResponse);
        actualResponseBody = JSON.parse(mockResponse._getData());
      });

      it("returns message about Invoice not being possible to edit", () => {
        expect(actualResponseBody.message).toEqual(
          `Invoice with ID ${invoice.id} cannot be edited - it's already Verified and only new Invoices can be edited.`
        );
      });
    });

    describe("when Invoice can be edited", () => {
      const data = Object.assign({}, invoicePayload);
      data.invoice.status = InvoiceStatuses.New;
      const invoice = InvoiceFactory.buildInDb(data, new InvoiceRepository());
      const mockRequest = httpMocks.createRequest({
        method: "PATCH",
        url: "/invoices/:id",
        params: { id: invoice.id },
        body: {}
      });
      const mockResponse = httpMocks.createResponse();
      let actualResponseBody;

      beforeAll(async () => {
        await editInvoice(mockRequest, mockResponse);
        actualResponseBody = JSON.parse(mockResponse._getData());
      });

      it("returns Invoice with requested ID", () => {
        expect(actualResponseBody.id).toEqual(invoice.id);
      });
    });
  });
});
