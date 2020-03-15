import httpMocks from "node-mocks-http";
import { editInvoice } from "../../../../app/actions/Invoices/editInvoice";

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
      const invoiceId = "0c618531-7101-40cf-9218-5dbee6fdfd93";
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

      it("returns message about Invoice not being possible to edit", () => {
        expect(actualResponseBody.message).toEqual(
          `Invoice with ID ${invoiceId} cannot be edited - it's already Verified and only new Invoices can be edited.`
        );
      });
    });

    describe("when Invoice can be edited", () => {
      const invoiceId = "0a0c0a14-c537-44bb-9716-5e181a47d977";
      const mockRequest = httpMocks.createRequest({
        method: "PATCH",
        url: "/invoices/:id",
        params: { id: invoiceId },
        body: {}
      });
      const mockResponse = httpMocks.createResponse();
      let actualResponseBody;

      beforeAll(async () => {
        await editInvoice(mockRequest, mockResponse);
        actualResponseBody = JSON.parse(mockResponse._getData());
      });

      it("returns Invoice with requested ID", () => {
        expect(actualResponseBody.id).toEqual(invoiceId);
      });
    });
  });
});
