import httpMocks from "node-mocks-http";
import { postNewInvoice } from "../../../app/actions/Invoices/postNewInvoice";
import { invoicePayload } from "../../support/mocks/payloadSamples";

describe("postNewInvoice", () => {
  const mockRequest = httpMocks.createRequest({
    method: "POST",
    url: "/new_invoice",
    body: invoicePayload
  });
  const mockResponse = httpMocks.createResponse();
  let actualResponseBody;

  beforeAll(async () => {
    await postNewInvoice(mockRequest, mockResponse);
    actualResponseBody = JSON.parse(mockResponse._getData());
  });

  it("returns ID of the newly created Invoice", async () => {
    expect(actualResponseBody.id).toBeTruthy();
  });

  it("returns status of the newly created Invoice", async () => {
    expect(actualResponseBody.status).toEqual("New");
  });

  it("returns message for the end user", async () => {
    expect(actualResponseBody.message).toEqual("New Invoice has been created successfully.");
  });
});
