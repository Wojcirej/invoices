import httpMocks from "node-mocks-http";
import { postCompany } from "../../../../app/actions/Companies/postCompany";
import { invoicePayload } from "../../../support/mocks/payloadSamples";

describe("postCompany", () => {
  describe("when valid request body", () => {
    const mockRequest = httpMocks.createRequest({
      method: "POST",
      url: "/Companies",
      body: invoicePayload.invoice.seller
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await postCompany(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns ID of the newly created Company", () => {
      expect(actualResponseBody.id).toBeTruthy();
    });

    it("returns Company object describing newly created Company", () => {
      expect(Object.keys(actualResponseBody)).toEqual([
        "id",
        "name",
        "address",
        "taxPayerNumber",
        "telephone",
        "website",
        "email"
      ]);
    });

    it("returns details of the newly Created company", () => {
      expect(actualResponseBody.name).toEqual(invoicePayload.invoice.seller.name);
      expect(actualResponseBody.address).toEqual(invoicePayload.invoice.seller.address);
      expect(actualResponseBody.taxPayerNumber).toEqual(invoicePayload.invoice.seller.taxPayerNumber);
      expect(actualResponseBody.email).toEqual(invoicePayload.invoice.seller.email);
      expect(actualResponseBody.telephone).toEqual(invoicePayload.invoice.seller.telephone);
      expect(actualResponseBody.website).toEqual(invoicePayload.invoice.seller.website);
    });
  });

  describe("when invalid request body", () => {
    const data = {
      name: null,
      address: null,
      taxPayerNumber: null,
      telephone: null,
      website: null,
      email: "invalid"
    };
    const mockRequest = httpMocks.createRequest({
      method: "POST",
      url: "/Companies",
      body: data
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await postCompany(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns ID of the newly created Company", () => {
      expect(actualResponseBody.id).toBeTruthy();
    });

    it("returns Company object describing invalid Company", () => {
      expect(Object.keys(actualResponseBody)).toEqual([
        "id",
        "name",
        "address",
        "taxPayerNumber",
        "telephone",
        "website",
        "email",
        "errors"
      ]);
    });

    it("returns details of the Company based on the provided data", () => {
      expect(actualResponseBody.name).toEqual(data.name);
      expect(actualResponseBody.address).toEqual(data.address);
      expect(actualResponseBody.taxPayerNumber).toEqual(data.taxPayerNumber);
      expect(actualResponseBody.email).toEqual(data.email);
      expect(actualResponseBody.telephone).toEqual(data.telephone);
      expect(actualResponseBody.website).toEqual(data.website);
    });

    it("returns list of errors", () => {
      const errors = actualResponseBody.errors;
      expect(errors.email).toEqual("Invalid format");
    });
  });
});
