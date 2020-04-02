import httpMocks from "node-mocks-http";
import { patchCompany } from "../../../../app/actions/Companies/patchCompany";
import { CompanyRepository } from "../../../../domain/Companies/CompanyRepository";
import { CompanyFactory } from "../../../../domain/Companies/CompanyFactory";

describe("patchCompany", () => {
  const repository = new CompanyRepository();
  const data = {
    name: "New",
    address: "Completely new",
    taxPayerNumber: "1223-451-12",
    telephone: "123 456 789",
    website: "www.example.com",
    email: "mail@example.com"
  };
  describe("when Company with provided ID exists", () => {
    let companyId, actualResponseBody, mockRequest, mockResponse;

    beforeAll(async () => {
      const company = CompanyFactory.build();
      repository.save(company);
      companyId = company.id;
      mockRequest = httpMocks.createRequest({
        method: "PATCH",
        url: "/companies/:id",
        params: { id: companyId },
        body: data
      });
      mockResponse = httpMocks.createResponse();
      await patchCompany(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns Company with requested ID", () => {
      expect(actualResponseBody.id).toEqual(companyId);
    });

    it("returns details of the edited Company", () => {
      expect(actualResponseBody.name).toEqual(data.name);
      expect(actualResponseBody.address).toEqual(data.address);
      expect(actualResponseBody.taxPayerNumber).toEqual(data.taxPayerNumber);
      expect(actualResponseBody.email).toEqual(data.email);
      expect(actualResponseBody.telephone).toEqual(data.telephone);
      expect(actualResponseBody.website).toEqual(data.website);
    });
  });

  describe("when Company with provided ID does not exist", () => {
    const companyId = "0";
    const mockRequest = httpMocks.createRequest({
      method: "PATCH",
      url: "/companies/:id",
      params: { id: companyId }
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await patchCompany(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns message about Company not found", () => {
      expect(actualResponseBody.message).toEqual(`Company with id ${companyId} does not exist.`);
    });
  });
});
