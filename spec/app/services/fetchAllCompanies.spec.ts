import { fetchAllCompanies } from "../../../app/services/fetchAllCompanies";
import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { CompanyDto } from "../../../app/dto/CompanyDto";

describe("fetchAllCompanies", () => {
  const repository = new CompanyRepository();

  it("returns list of CompanyDto", () => {
    const list = fetchAllCompanies(repository);
    list.forEach(item => {
      expect(item).toBeInstanceOf(CompanyDto);
    });
  });
});
