import httpMocks from "node-mocks-http";
import { patchCompany } from "../../../../app/actions/Companies/patchCompany";
import { CompanyRepository } from "../../../../domain/Companies/CompanyRepository";
import { CompanyFactory } from "../../../../domain/Companies/CompanyFactory";

describe("patchCompany", () => {
  const repository = new CompanyRepository();
  describe("when Company with provided ID exists", () => {
    let companyId, actualResponseBody, mockRequest, mockResponse;

    describe("when valid data", () => {
      const data = {
        name: "New",
        address: "Completely new",
        taxPayerNumber: "1223-451-12",
        telephone: "123 456 789",
        website: "www.example.com",
        email: "mail@example.com"
      };

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

      it("returns Company object describing edited Company", () => {
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

      it("returns details of the edited Company", () => {
        expect(actualResponseBody.name).toEqual(data.name);
        expect(actualResponseBody.address).toEqual(data.address);
        expect(actualResponseBody.taxPayerNumber).toEqual(data.taxPayerNumber);
        expect(actualResponseBody.email).toEqual(data.email);
        expect(actualResponseBody.telephone).toEqual(data.telephone);
        expect(actualResponseBody.website).toEqual(data.website);
      });
    });

    describe("when valid data", () => {
      const data = {
        name: "New",
        address: "Completely new",
        taxPayerNumber: "1223-451-12",
        telephone: "123 456 789",
        website: "www.example.com",
        email: "mail[at]example.com"
      };

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

      it("returns Company object describing edited Company", () => {
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

      it("returns details of the Company with potentially new data", () => {
        expect(actualResponseBody.name).toEqual(data.name);
        expect(actualResponseBody.address).toEqual(data.address);
        expect(actualResponseBody.taxPayerNumber).toEqual(data.taxPayerNumber);
        expect(actualResponseBody.email).toEqual(data.email);
        expect(actualResponseBody.telephone).toEqual(data.telephone);
        expect(actualResponseBody.website).toEqual(data.website);
      });

      it("returns list of errors", () => {
        expect(actualResponseBody.errors.email).toEqual("Invalid format");
      });
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
