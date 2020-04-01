import httpMocks from "node-mocks-http";
import { getCompany } from "../../../../app/actions/Companies/getCompany";
import { invoicePayload } from "../../../support/mocks/payloadSamples";
import { CompanyRepository } from "../../../../domain/Companies/CompanyRepository";
import { CompanyFactory } from "../../../../domain/Companies/CompanyFactory";

describe("getCompany", () => {
  const repository = new CompanyRepository();
  describe("when Company with provided ID exists", () => {
    let companyId, actualResponseBody, mockRequest, mockResponse;

    beforeAll(async () => {
      const company = CompanyFactory.build(invoicePayload.invoice.seller);
      repository.save(company);
      companyId = company.id;
      mockRequest = httpMocks.createRequest({
        method: "GET",
        url: "/Companies/:id",
        params: { id: companyId }
      });
      mockResponse = httpMocks.createResponse();
      await getCompany(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns Company with requested ID", () => {
      expect(actualResponseBody.id).toEqual(companyId);
    });

    it("returns details of the requested Company", () => {
      expect(actualResponseBody.name).toEqual(invoicePayload.invoice.seller.name);
      expect(actualResponseBody.address).toEqual(invoicePayload.invoice.seller.address);
      expect(actualResponseBody.taxPayerNumber).toEqual(invoicePayload.invoice.seller.taxPayerNumber);
      expect(actualResponseBody.email).toEqual(invoicePayload.invoice.seller.email);
      expect(actualResponseBody.telephone).toEqual(invoicePayload.invoice.seller.telephone);
      expect(actualResponseBody.website).toEqual(invoicePayload.invoice.seller.website);
    });
  });

  describe("when Company with provided ID does not exist", () => {
    const companyId = "0";
    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/Companies/:id",
      params: { id: companyId }
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await getCompany(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns message about Company not found", () => {
      expect(actualResponseBody.message).toEqual(`Company with id ${companyId} does not exist.`);
    });
  });
});
