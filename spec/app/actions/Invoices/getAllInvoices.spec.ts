import httpMocks from "node-mocks-http";
import { getAllInvoices } from "../../../../app/actions/Invoices/getAllInvoices";
import { InvoiceRepository } from "../../../../domain/Invoices/repositories/InvoiceRepository";

describe("getAllInvoices", () => {
  const mockRequest = httpMocks.createRequest({
    method: "GET",
    url: "/invoices/"
  });
  const mockResponse = httpMocks.createResponse();
  const invoiceRepository = new InvoiceRepository();
  let actualResponseBody;

  beforeAll(async () => {
    await getAllInvoices(mockRequest, mockResponse);
    actualResponseBody = JSON.parse(mockResponse._getData());
  });

  it("returns list of all existing Invoices", () => {
    const expectedInvoiceIds = invoiceRepository.findAll().map(invoice => invoice.id);
    const returnedInvoiceIds = actualResponseBody.map(invoice => invoice.id);
    expect(expectedInvoiceIds).toEqual(returnedInvoiceIds);
  });
});
