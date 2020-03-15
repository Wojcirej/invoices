import httpMocks from "node-mocks-http";
import { getInvoice } from "../../../../app/actions/Invoices/getInvoice";

describe("getInvoice", () => {
  describe("when Invoice with provided ID exists", () => {
    const invoiceId = "0a0c0a14-c537-44bb-9716-5e181a47d977";
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

    it("returns Invoice with requested ID", () => {
      expect(actualResponseBody.id).toEqual(invoiceId);
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
