import httpMocks from "node-mocks-http";
import { getInvoice } from "../../../../app/actions/Invoices/getInvoice";
import { InvoiceFactory } from "../../../../domain/Invoices/factories/InvoiceFactory";
import { invoicePayload } from "../../../support/mocks/payloadSamples";
import { InvoiceRepository } from "../../../../domain/Invoices/repositories/InvoiceRepository";

describe("getInvoice", () => {
  describe("when Invoice with provided ID exists", () => {
    const invoice = InvoiceFactory.buildInDb(invoicePayload, new InvoiceRepository());
    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/invoices/:id",
      params: { id: invoice.id }
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await getInvoice(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns Invoice with requested ID", () => {
      expect(actualResponseBody.id).toEqual(invoice.id);
    });
  });

  describe("when Invoice with provided ID does not exist", () => {
    const invoiceId = "0";
    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/invoices/:id",
      params: { id: invoiceId }
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await getInvoice(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns message about Invoice not found", () => {
      expect(actualResponseBody.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
    });
  });
});
