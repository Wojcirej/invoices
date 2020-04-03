import httpMocks from "node-mocks-http";
import { getAllCompanies } from "../../../../app/actions/Companies/getAllCompanies";
import { CompanyRepository } from "../../../../domain/Companies/CompanyRepository";

describe("getAllCompanies", () => {
  const mockRequest = httpMocks.createRequest({
    method: "GET",
    url: "/companies"
  });
  const mockResponse = httpMocks.createResponse();
  const companyRepository = new CompanyRepository();
  let actualResponseBody;

  beforeAll(async () => {
    await getAllCompanies(mockRequest, mockResponse);
    actualResponseBody = JSON.parse(mockResponse._getData());
  });

  it("returns list of all existing Companies", () => {
    const expectedCompanyIds = companyRepository.findAll().map(company => company.id);
    const returnedCompanyIds = actualResponseBody.map(company => company.id);
    expect(expectedCompanyIds).toEqual(returnedCompanyIds);
  });

  it("returns list of objects describing companies", () => {
    const expectedKeys = ["id", "name", "address", "taxPayerNumber", "telephone", "website", "email"];
    actualResponseBody.forEach(company => {
      expect(Object.keys(company)).toEqual(expectedKeys);
    });
  });
});
