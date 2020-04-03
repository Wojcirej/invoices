import { CompanyRepository } from "../../../../domain/Companies/CompanyRepository";
import { fetchCompany } from "../../../../domain/Companies/services/fetchCompany";
import { CompanyFactory } from "../../../../domain/Companies/CompanyFactory";
import { CompanyDto } from "../../../../domain/Companies/dto/CompanyDto";

describe("fetchCompany", () => {
  const repository = new CompanyRepository();

  describe("when Company with requested ID does not exist", () => {
    const companyId = "0";

    it("throws CompanyNotFoundError", () => {
      try {
        fetchCompany(companyId, repository);
      } catch (error) {
        expect(error.name).toEqual("CompanyNotFoundError");
        expect(error.message).toEqual(`Company with id ${companyId} does not exist.`);
      }
    });
  });

  describe("when Company with requested ID exists", () => {
    let company;

    beforeEach(() => {
      company = CompanyFactory.build();
      repository.save(company);
    });

    it("returns instance of CompanyDto", () => {
      expect(fetchCompany(company.id, repository)).toBeInstanceOf(CompanyDto);
    });

    it("returns object containing ID of the deleted Company", () => {
      const companyDto = fetchCompany(company.id, repository);
      expect(companyDto.id).toEqual(company.id);
    });

    it("returns details of deleted company", () => {
      const companyDto = fetchCompany(company.id, repository);
      expect(companyDto.name).toEqual(company.name);
      expect(companyDto.address).toEqual(company.address);
      expect(companyDto.taxPayerNumber).toEqual(company.taxPayerNumber);
      expect(companyDto.telephone).toEqual(company.telephone);
      expect(companyDto.website).toEqual(company.website);
      expect(companyDto.email).toEqual(company.email);
    });
  });
});
